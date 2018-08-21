'use strict';

const DEFAULT_OPTIONS = {
  storeOnDisk: false,
  legacy: false,
  clean: true,
  debug: false,
  useDocker: false,
  host:'localhost',
  port: 8081,
  project:'test',
  consistency: '1.0',
  dockerImage: 'google/cloud-sdk:206.0.0'
};

const nodeCleanup = require('node-cleanup');

const LocallyInstalledSdk = require('./locally-installed-sdk');
const DockerSdk = require('./docker-sdk');

/**
 * DataStoreEmulator class only select the emulator engine:
 * - locally installed version
 * - docker container
 */
class DataStoreEmulator {

  constructor(options) {
    this._options = {};
    this._options = Object.assign(this._options, DEFAULT_OPTIONS, options);

    if (this._options.useDocker) {
      this.engine = new DockerSdk(this._options);
    }
    else {
      this.engine = new LocallyInstalledSdk(this._options);
    }

    const self = this;

    // Try to stop the engine a automatically when any stop / exit event occurred.
    nodeCleanup(() => {
      self.stop();
      nodeCleanup.uninstall();
      return false;
    });
  }

  /**
   * Start the emulator
   * @returns {Promise}
   */
  start() {
    return this.engine.start()
  }

  /**
   * Stop the emulator
   * @returns {Promise}
   */
  stop() {
    return this.engine.stop();
  }
}

module.exports = DataStoreEmulator;
