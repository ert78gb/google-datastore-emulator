'use strict';

const spawn = require("child_process").spawn;
const kill = require('tree-kill');

const EmulatorStates = require('./emulator-states');
const BaseEmulator = require('./base-emulator');

/**
 * Wrapper for the locally installed SDK
 */
class LocallyInstalledSdk extends BaseEmulator {
  constructor(options) {
    super(options);
    this._emulator = null;
  }

  /**
   * Start the emulator
   * @returns {Promise}
   */
  start() {
    const self = this;

    return new Promise((resolve, reject) => {

      if (this._state)
        throw new Error('Datastore emulator is already running.');

      super._start(resolve, reject);

      const params = this._getCommandParameters();
      self._emulator = spawn('gcloud', params, { shell: true });

      self._registerEmulatorListeners();
    })

  }

  /**
   * Stop the emulator
   * @returns {Promise}
   */
  stop() {

    if (this._state !== EmulatorStates.RUNNING)
      return Promise.resolve();

    return new Promise((resolve, reject) => {

      super._stop()
        .then(resolve)
        .catch(reject);

      kill(this._emulator.pid, err => {
        if (err)
          return reject(err);
      })
    })
  }

  /**
   * Override the base class method. Redirect the emulator host-port settings
   * @param params
   * @protected
   */
  _setHostPort(params) {
    params.push(...['--host-port', `${this._options.host}:${this._options.port}`]);
  }

  /**
   * Override the base class method. Redirect the emulator working directory
   * @param params
   * @protected
   */
  _setDatadir(params) {
    if (this._options.dataDir) {
      this._createDataDirSync();
      params.push(...['--data-dir', this._options.dataDir]);
    }
  }

  _registerEmulatorListeners() {
    this._emulator.stdout.on('data', this._emulatorStdOutListener.bind(this));

    this._emulator.stderr.on('data', this._emulatorStdErrListener.bind(this));

    this._emulator.on('close', this._emulatorCloseListener.bind(this));

    this._emulator.on('exit', this._emulatorExitListener.bind(this));

    this._emulator.on('error', this._emulatorErrorListener.bind(this));
  }

  _removeEmulatorListeners() {
    this._emulator.stdout.removeAllListeners('data');

    this._emulator.stderr.removeAllListeners('data');

    this._emulator.removeAllListeners('close');

    this._emulator.removeAllListeners('exit');

    this._emulator.removeAllListeners('error');

  }

  _emulatorStdOutListener(data) {
    this._writeDebug(`stdout: ${data}`);
    this._processStd(data);
  }

  _emulatorStdErrListener(data) {
    this._writeDebug(`stderr: ${data}`);
    this._processStd(data);
  }

  _emulatorCloseListener(code) {
    this._writeDebug(`child process close with code ${code}`);
    this._setState(EmulatorStates.CLOSE, code);
  }

  _emulatorExitListener(code) {
    this._writeDebug(`child process exit with code ${code}`);
    this._setState(EmulatorStates.EXIT, code);
  }

  _emulatorErrorListener(err) {
    this._writeDebug(`child process error: ${err}`);
    this._setState(EmulatorStates.ERROR, err);
  }

}

module.exports = LocallyInstalledSdk;
