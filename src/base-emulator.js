'use strict';
const DEV_APP_SERVER_RUNNING_KEY = '[datastore] Dev App Server is now running.';

const EventEmitter = require('events');
const fse = require('fs-extra');

const EmulatorStates = require('./emulator-states');

class DataStoreStateEmitter extends EventEmitter {
}

/**
 * BaseEmulator class. Contains common methods.
 */
class BaseEmulator {
  constructor(options) {
    this._state = null;
    this._stateEmitter = new DataStoreStateEmitter();
    this._options = options;
  }

  /**
   * Start function for all engine. Register all listener to the stateEmitter.
   * @param resolve Promise.resolve callback
   * @param reject Promise.reject callback
   * @private
   */
  _start(resolve, reject) {
    const self = this;

    function startSuccessListener() {
      removeStartListeners();
      resolve();
    }

    function startRejectListener(error) {
      removeStartListeners();
      reject(error);
    }

    function removeStartListeners() {
      self._stateEmitter.removeListener(EmulatorStates.RUNNING, startSuccessListener.bind(this));

      self._stateEmitter.removeListener(EmulatorStates.CLOSE, startRejectListener.bind(this));
    }

    self._stateEmitter.on(EmulatorStates.RUNNING, startSuccessListener.bind(this));

    self._stateEmitter.on(EmulatorStates.CLOSE, startRejectListener.bind(this));
  }

  /**
   * Stop function for all engine. Deregister all listener to the stateEmitter.
   * @param resolve Promise.resolve callback
   * @private
   */
  _stop(resolve) {
    const self = this;

    let resolved = false;

    function stopListener() {
      if (resolved)
        return;

      resolved = true;
      removeStopListeners();
      self._removeEmulatorListeners();
      return self._clean()
        .then(resolve);
    }

    function removeStopListeners() {
      self._stateEmitter.removeListener(EmulatorStates.EXIT, stopListener.bind(this));

      self._stateEmitter.removeListener(EmulatorStates.CLOSE, stopListener.bind(this));
    }

    this._stateEmitter.on(EmulatorStates.EXIT, stopListener.bind(this));

    this._stateEmitter.on(EmulatorStates.CLOSE, stopListener.bind(this));
  }

  /**
   * Process all data that come from the emulator output and error streams
   * @param data
   * @protected
   */
  _processStd(data) {
    const text = data.toString();

    if (text.indexOf(DEV_APP_SERVER_RUNNING_KEY) > -1) {
      this._setEnviromentVariables();
      this._setState(EmulatorStates.RUNNING);
    }
  }

  /**
   * If debug mode allowed write message to the console
   * @param message
   * @protected
   */
  _writeDebug(message) {
    if (!this._options.debug)
      return;

    console.log(message);
  }

  /**
   * Set the new state of the emulator and emit it.
   * @param newState {EmulatorStates}
   * @param params {*}
   * @protected
   */
  _setState(newState, params) {
    this._state = newState;
    this._stateEmitter.emit(newState, params);
  }

  /**
   * Set environment variables for the emulator:
   * - DATASTORE_EMULATOR_HOST
   * - DATASTORE_PROJECT_ID
   * @private
   */
  _setEnviromentVariables() {
    process.env.DATASTORE_EMULATOR_HOST = `${this._options.host}:${this._options.port}`;

    if (!process.env.DATASTORE_PROJECT_ID && this._options.project) {
      process.env.DATASTORE_PROJECT_ID = this._options.project
    }
  }

  /**
   * Return with the command line parameters
   * @returns {string[]}
   * @protected
   */
  _getCommandParameters() {
    const params = ['beta', 'emulators', 'datastore', 'start'];

    if (this._options.project) {
      params.push('--project=' + this._options.project);
    }

    this._setHostPort(params);

    this._setDatadir(params);

    if (this._options.debug) {
      params.push('--verbosity=debug');
    }

    if (!this._options.storeOnDisk) {
      params.push('--no-store-on-disk')
    }

    if (this._options.legacy) {
      params.push('--legacy')
    }

    return params;
  }

  /**
   * Depend from the engine how to set host and ports for the emulator
   * @param params
   * @protected
   * @abstract
   */
  _setHostPort /* istanbul ignore next */ (params) {
    throw new Error('_setHostPort method must be implement')
  }

  /**
   * Depend from the engine how to set data directory for the emulator
   * @param params
   * @protected
   * @abstract
   */
  _setDatadir /* istanbul ignore next */ (params) {
    throw new Error('_setDatadir method must be implement')
  }

  /**
   * Delete the dataDir if clean allowed and dataDir has been set in the options.
   * @returns {Promise}
   * @private
   */
  _clean() {
    if (!this._options.clean)
      return Promise.resolve();

    if (!this._options.dataDir)
      return Promise.resolve();

    return new Promise((resolve, reject) => {
      fse.remove(this._options.dataDir, (err) => {
        /* istanbul ignore if */
        if (err) return reject(err);

        resolve();
      })
    })
  }

  /**
   * Create a dataDir
   * @private
   */
  _createDataDirSync() {
    const self = this;
    fse.ensureDir(this._options.dataDir, function (err) {
      /* istanbul ignore if */
      if (err)
        throw new Error(`Can not create datadir: ${self._options.dataDir}, error: ${err}`)
    })
  }

  _removeEmulatorListeners() {
  }
}

module.exports = BaseEmulator;
