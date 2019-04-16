'use strict';
const EMULATOR_HOST_NAME = 'datastore-emulator';
const EMULATOR_PORT = '8081';

const path = require('path');
const Docker = require('dockerode');
const EmulatorStates = require('./emulator-states');
const BaseEmulator = require('./base-emulator');

/**
 * Wrapper for the Docker container engine
 */
class DockerSdk extends BaseEmulator {
  constructor(options) {
    super(options);
    this._docker = new Docker();
    this._container = null;
  }

  /**
   * Start the emulator. If need pull the image
   * @returns {Promise}
   */
  start() {
    const self = this;
    return new Promise((resolve, reject) => {
      if (this._state)
        throw new Error('Datastore (Docker) emulator is already running.');

      super._start(resolve, reject);
      let cmd = ['gcloud'].concat(self._getCommandParameters());

      const port = EMULATOR_PORT + '/tcp';
      const bind = [];

      // If data directory set then map the local directory to the container directory
      if (self._options.dataDir) {
        const abs = path.resolve(self._options.dataDir);
        bind.push(abs + ':/.config/gcloud/emulators/datastore');
      }

      self._pullImage()
        .then(() => {
          return self._docker.createContainer({
            Hostname: EMULATOR_HOST_NAME,
            Image: self._options.dockerImage,
            AttachStdin: false,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            Cmd: cmd,
            OpenStdin: false,
            StdinOnce: false,
            ExposedPorts: {
              [port]: {}
            },
            HostConfig: {
              PortBindings: {
                [port]: [
                  {
                    HostPort: self._options.port.toString()
                  }
                ]
              },
              Binds: bind
            }
          })
        })
        .then((container) => {
          self._container = container;

          // attach streams to the container
          container.attach({ stream: true, stdout: true, stderr: true }, function (err, stream) {
            /* istanbul ignore if */
            if (err)
              return reject(err);

            // all stream data pass to the processor.
            stream.on('data', (data) => {
              const msg = data.toString();
              self._writeDebug(msg);
              self._processStd(msg);
            });
          });

          return self._container.start();
        })
        .catch(reject)
    })
  }

  /**
   * Stop the container
   * @returns {Promise}
   */
  stop() {
    if (this._state !== EmulatorStates.RUNNING || !this._container)
      return Promise.resolve();

    return new Promise((resolve, reject) => {
      super._stop()
        .then(resolve)
        .catch(reject);

      this._container.stop()
        .then(() => {
          this._setState(EmulatorStates.EXIT, 0);
        })
        .catch(reject);
    })
  }

  /**
   * Pull the docker image
   * @returns {Object}
   * @private
   */
  _pullImage() {
    const self = this;
    return new Promise((resolve, reject) => {
      self._docker.pull(self._options.dockerImage, function (err, stream) {
        if(err)
          return reject(err);

        self._docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(err, output) {
          self._writeDebug(output);

          if (err) return reject(err);

          return resolve();
        }

        function onProgress(event) {
          self._writeDebug(event);
        }
      });

    })
  }

  /**
   * Set the host and port setting for emulator
   * @param params
   * @protected
   */
  _setHostPort(params) {
    params.push(`--host-port=${EMULATOR_HOST_NAME}:${EMULATOR_PORT}`);
  }

  /**
   * Override the base class abstract method. Not redirect the default working directory when use Docker image
   * @param params
   * @protected
   */
  _setDatadir(params) {
  }

  /**
   * Override the base class method. Set the consistency level of the emulator
   * @param params
   * @protected
   */
  _setConsistency(params) {
    if (this._options.consistency) {
      params.push(`--consistency=${this._options.consistency}`)
    }
  }

}

module.exports = DockerSdk;
