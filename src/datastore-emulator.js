const DATASTORE_EMULATOR_HOST_KEY = '[datastore]   export DATASTORE_EMULATOR_HOST=';
const DEV_APP_SERVER_RUNNING_KEY = '[datastore] Dev App Server is now running.';
const DEFAULT_OPTIONS = {
    storeOnDisk: false,
    legacy: false,
    clean: true,
    debug:false
};

const EmulatorStates = require('./emulator-states');
const spawn = require('child_process').spawn;
const EventEmitter = require('events');
const fse = require('fs-extra');
const kill = require('tree-kill');

class DataStoreStateEmitter extends EventEmitter {
}

class DataStoreEmulator {

    constructor(options) {
        this._emulator = null;
        this._options = DEFAULT_OPTIONS;
        Object.assign(this._options, options);

        this._emulator_host = null;
        this._state = null;
        this._stateEmitter = new DataStoreStateEmitter();

        const self = this;
        process.on('exit', () => {
            self.stop();
        })
    }

    start() {
        const self = this;

        if (this._state)
            throw new Error('Datastore emulator is already running.');

        const params = this._getCommandParameters();
        self._emulator = spawn('gcloud', params);

        self._registerEmulatorListeners();

        return new Promise((resolve, reject) => {

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

                // self._stateEmitter.removeListener(EmulatorStates.EXIT, startRejectListener.bind(this));

                self._stateEmitter.removeListener(EmulatorStates.CLOSE, startRejectListener.bind(this));
            }

            self._stateEmitter.on(EmulatorStates.RUNNING, startSuccessListener.bind(this));

            // self._stateEmitter.on(EmulatorStates.EXIT, startRejectListener.bind(this));

            self._stateEmitter.on(EmulatorStates.CLOSE, startRejectListener.bind(this));

        })

    }

    stop() {

        if (this._state !== EmulatorStates.RUNNING)
            return Promise.resolve();

        const self = this;

        return new Promise((resolve) => {
            let resolved = false;

            function stopListener() {
                if (resolved)
                    return;

                resolved = true;
                this._emulator_host = null;
                removeStopListeners();
                self._removeEmulatorListeners();
                return self._clean()
                    .then(resolve);
            }

            function removeStopListeners() {
                self._stateEmitter.on(EmulatorStates.EXIT, stopListener.bind(this));

                self._stateEmitter.on(EmulatorStates.CLOSE, stopListener.bind(this));
            }

            this._stateEmitter.on(EmulatorStates.EXIT, stopListener.bind(this));

            this._stateEmitter.on(EmulatorStates.CLOSE, stopListener.bind(this));

            kill(this._emulator.pid);
        })
    }

    _processStd(data) {
        const text = data.toString();

        if (text.indexOf(DATASTORE_EMULATOR_HOST_KEY) > -1) {
            let s = text.substring(text.indexOf('=') + 1);
            this._emulator_host = s.substr(0, s.indexOf('\n'));
            let a = 1;
        }

        if (text.indexOf(DEV_APP_SERVER_RUNNING_KEY) > -1) {
            this._setEnviromentVariables();
            this._setState(EmulatorStates.RUNNING);
        }
    }

    _getCommandParameters() {
        const params = ['beta', 'emulators', 'datastore', 'start'];

        if (this._options.project) {
            params.push('--project=' + this._options.project);
        }

        if (this._options.host && this._options.port) {
            params.push(`--host-port=${this._options.host}:${this._options.port}`);
        }
        else if (!this._options.host && this._options.port) {
            throw new Error('If you set port you need to set host.')
        }
        else if (this._options.host && !this._options.port)
        {
            throw new Error('If you set host you need to set port.')
        }

        if (this._options.dataDir) {
            this._createDataDirSync();
            params.push('--data-dir=' + this._options.dataDir);
        }

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

    _writeDebug(message) {
        if (!this._options.debug)
            return;

        console.log(message);
    }

    _setState(newState, params) {
        this._state = newState;
        this._stateEmitter.emit(newState, params);
    }

    _setEnviromentVariables() {
        process.env.DATASTORE_EMULATOR_HOST = this._emulator_host;

        if (!process.env.DATASTORE_PROJECT_ID && this._options.project) {
            process.env.DATASTORE_PROJECT_ID = this._options.project
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
        this._emulator.stdout.removeListener('data', this._emulatorStdOutListener.bind(this));

        this._emulator.stderr.removeListener('data', this._emulatorStdErrListener.bind(this));

        this._emulator.removeListener('close', this._emulatorCloseListener.bind(this));

        this._emulator.removeListener('exit', this._emulatorExitListener.bind(this));

        this._emulator.removeListener('error', this._emulatorErrorListener.bind(this));

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

    _clean() {
        if (!this._options.clean)
            return Promise.resolve();

        if (!this._options.dataDir)
            return Promise.resolve();

        return new Promise((resolve, reject) => {
            fse.remove(this._options.dataDir, (err) => {
                if (err) return reject(err);

                resolve();
            })
        })
    }

    _createDataDirSync() {
        const self = this;
        fse.ensureDir(this._options.dataDir, function (err) {
            if (err)
                throw new Error(`Can not create datadir: ${self._options.dataDir}, error: ${err}`)
        })
    }
}

module.exports = DataStoreEmulator;