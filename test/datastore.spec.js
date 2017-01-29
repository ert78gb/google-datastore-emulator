'use strict';


const chai = require('chai');
const Emulator = require('../index');
const fs = require('fs');

chai.use(require("chai-as-promised"));

const expect = chai.expect;
const testData = {
    testProp: 'test-data'
};

describe('Google DataStore Emulator Test', () => {

    it('should start the emulator with env.GCLOUD_PROJECT', (done) => {
        process.env.GCLOUD_PROJECT = 'test';

        let entityKey;

        let options = {
            debug: true
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {
                const datastore = require('@google-cloud/datastore')();
                entityKey = datastore.key({namespace: 'test-ns', path: ['test-path']});
                const testEntity = {
                    key: entityKey,
                    data: testData
                };

                return datastore.save(testEntity);
            })
            .then(() => {
                const datastore = require('@google-cloud/datastore')();

                return datastore.get(entityKey);
            })
            .then((result) => {
                expect(result.length).to.be.equal(1);
                const entity = result[0];
                expect(entity).to.be.deep.equal(testData);
            })
            .then(() => {
                return emulator.stop();
            })
            .then(() => {
                process.env.GCLOUD_PROJECT = null;
                done();
            })
            .catch((error) => {
                process.env.GCLOUD_PROJECT = null;
                expect(error).to.be.nok;
                done();
            })

    });

    it('should not write to console if debug=false', (done) => {
        process.env.GCLOUD_PROJECT = 'test';
        let wroteDataStore = false;
        console.log = function (d) {
            if (d.indexOf('[datastore]') > -1) {
                wroteDataStore = true;
            }
            process.stdout.write(d + '\n');
        };

        let options = {
            debug: false
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {
                return emulator.stop();
            })
            .then(() => {
                delete console.log;
                expect(wroteDataStore).to.be.equal(false);
                process.env.GCLOUD_PROJECT = null;
                done();
            })
            .catch((error) => {
                process.env.GCLOUD_PROJECT = null;
                expect(error).to.be.nok;
                done();
            })

    });

    it('should start the emulator when set project Id', (done) => {
        const projectId = 'test2';
        let entityKey;

        let options = {
            debug: true,
            project: projectId
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {
                const datastore = require('@google-cloud/datastore')({
                    projectId
                });
                entityKey = datastore.key({namespace: 'test-ns', path: ['test-path']});
                const testEntity = {
                    key: entityKey,
                    data: testData
                };

                return datastore.save(testEntity);
            })
            .then(() => {
                const datastore = require('@google-cloud/datastore')({
                    projectId
                });

                return datastore.get(entityKey);
            })
            .then((result) => {
                expect(result.length).to.be.equal(1);
                const entity = result[0];
                expect(entity).to.be.deep.equal(testData);
            })
            .then(() => {
                return emulator.stop();
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                expect(error).to.be.nok;
                done();
            })

    });

    it('should start the emulator when set project Id and dataDir', (done) => {
        const projectId = 'test3';
        const dataDir = './emulator-test3';

        expect(directoryExists(dataDir)).to.be.equal(false);

        let entityKey;

        let options = {
            debug: true,
            project: projectId,
            dataDir
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {
                expect(directoryExists(dataDir)).to.be.equal(true);

                const datastore = require('@google-cloud/datastore')({
                    projectId
                });
                entityKey = datastore.key({namespace: 'test-ns', path: ['test-path']});
                const testEntity = {
                    key: entityKey,
                    data: testData
                };

                return datastore.save(testEntity);
            })
            .then(() => {
                const datastore = require('@google-cloud/datastore')({
                    projectId
                });

                return datastore.get(entityKey);
            })
            .then((result) => {
                expect(result.length).to.be.equal(1);
                const entity = result[0];
                expect(entity).to.be.deep.equal(testData);
            })
            .then(() => {
                return emulator.stop();
            })
            .then(() => {
                expect(directoryExists(dataDir)).to.be.equal(false);
                done();
            })
            .catch((error) => {
                expect(error).to.be.nok;
            })
    });

    it('should start the emulator with specified host and port', (done) => {
        process.env.GCLOUD_PROJECT = 'test';
        let entityKey;

        let options = {
            debug: true,
            host: 'localhost',
            port: 8555
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {

                expect(process.env.DATASTORE_EMULATOR_HOST).to.be.equal(`${options.host}:${options.port}`);
                const datastore = require('@google-cloud/datastore')();
                entityKey = datastore.key({namespace: 'test-ns', path: ['test-path']});
                const testEntity = {
                    key: entityKey,
                    data: testData
                };

                return datastore.save(testEntity);
            })
            .then(() => {
                const datastore = require('@google-cloud/datastore')();

                return datastore.get(entityKey);
            })
            .then((result) => {
                expect(result.length).to.be.equal(1);
                const entity = result[0];
                expect(entity).to.be.deep.equal(testData);
            })
            .then(() => {
                return emulator.stop();
            })
            .then(() => {
                process.env.GCLOUD_PROJECT = null;
                done();
            })
            .catch((error) => {
                process.env.GCLOUD_PROJECT = null;
                expect(error).to.be.nok;
                done();
            })

    });

    it('should not start twice', (done) => {
        process.env.GCLOUD_PROJECT = 'test';

        let options = {
            debug: true
        };

        let emulator = new Emulator(options);

        emulator.start()
            .then(() => {
                return emulator.start();
            })
            .then(() => {
                done('it should be throw error');
            })
            .catch((error) => {
                process.env.GCLOUD_PROJECT = null;
                expect(error.message).to.be.equal('Datastore emulator is already running.');
                return emulator.stop()
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                expect(error).to.be.nok;
                done();
            })

    })

});

function directoryExists(dir) {
    try {
        const stat = fs.statSync(dir);

        return stat.isDirectory();
    }
    catch (error) {
        return false;
    }
}