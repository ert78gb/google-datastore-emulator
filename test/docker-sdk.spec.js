'use strict';

// google/cloud-sdk image run only on linux os
const envDescribe = process.env.APPVEYOR === 'True' ? describe.skip : describe;

const chai = require('chai');
const Emulator = require('../index');
const fs = require('fs');
const fse = require('fs-extra');
const nodeCleanup = require('node-cleanup');
const path = require('path');

chai.use(require("chai-as-promised"));

const testUtil = require('./test-util');

const expect = chai.expect;
const testData = {
  testProp: 'test-data'
};

envDescribe('Docker Container Google DataStore Emulator Test', () => {
  const emulatorDir = './emulator-test3';

  before((done) => {
    process.env.CLOUDSDK_CORE_PROJECT = 'test';

    if (testUtil.directoryExists(emulatorDir))
      fse.remove(emulatorDir, (err) => {
        return done(err);
      });
    else {
      done()
    }
  });

  beforeEach(() => {
    process.env.GCLOUD_PROJECT = null;
  });

  afterEach(() => {
    process.env.GCLOUD_PROJECT = null;
  });

  it('should start the emulator with env.GCLOUD_PROJECT', () => {
    process.env.GCLOUD_PROJECT = 'test';

    let entityKey;

    let options = {
      debug: true,
      useDocker: true,
      project: 'test'
    };

    let emulator = new Emulator(options);

    return emulator.start()
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
  });

  it('should not write to console if debug=false', () => {
    process.env.GCLOUD_PROJECT = 'test';
    let wroteDataStore = false;
    console.log = function (d) {
      process.stdout.write(d + '\n');

      if (!d)
        return;

      if (d.indexOf('[datastore]') > -1) {
        wroteDataStore = true;
      }
    };

    let options = {
      debug: false,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
      .then(() => {
        return emulator.stop();
      })
      .then(() => {
        delete console.log;
        expect(wroteDataStore).to.be.equal(false);
        process.env.GCLOUD_PROJECT = null;
      })

  });

  it('should start the emulator when set project Id', () => {
    const projectId = 'test2';
    let entityKey;

    let options = {
      debug: true,
      project: projectId,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
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

        return Promise.resolve();
      })
      .then(() => {
        return emulator.stop();
      })
  });

  it.skip('should start the emulator when set project Id and dataDir', () => {
    const projectId = 'test3';
    const dataDir = emulatorDir;

    expect(testUtil.directoryExists(dataDir)).to.be.equal(false);

    let entityKey;

    let options = {
      debug: true,
      project: projectId,
      dataDir,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
      .then(() => {
        let file = path.join(dataDir, 'env.yaml');
        expect(testUtil.fileExists(file)).to.be.equal(true);


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

        return Promise.resolve();
      })
      .then(() => {
        return emulator.stop();
      })
      .then(() => {
        expect(testUtil.directoryExists(dataDir)).to.be.equal(false);
      })
  });

  it('should start the emulator with specified host and port', () => {
    process.env.GCLOUD_PROJECT = 'test';
    let entityKey;

    let options = {
      debug: true,
      host: 'localhost',
      port: 8555,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
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
        return emulator.stop()
          .then(() => {
            expect(result.length).to.be.equal(1);
            const entity = result[0];
            expect(entity).to.be.deep.equal(testData);
          })
      })
  });

  it('should start the emulator on localhost when specified only port', () => {
    process.env.GCLOUD_PROJECT = 'test';
    let entityKey;

    let options = {
      debug: true,
      port: 8555,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
      .then(() => {

        expect(process.env.DATASTORE_EMULATOR_HOST).to.be.equal(`localhost:${options.port}`);
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
        return emulator.stop()
          .then(() => {
            expect(result.length).to.be.equal(1);
            const entity = result[0];
            expect(entity).to.be.deep.equal(testData);

          });
      })
  });

  it('should not start twice', () => {
    process.env.GCLOUD_PROJECT = 'test';

    let options = {
      debug: true,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
      .then(() => {
        return expect(emulator.start()).to.rejected;
      })
      .then((error) => {
        return emulator.stop().then(() => {
          expect(error).to.have.property('message', 'Datastore (Docker) emulator is already running.');
        });
      })
  });

  it('should return ok when call stop twice', () => {
    process.env.GCLOUD_PROJECT = 'test';

    let options = {
      debug: true,
      useDocker: true
    };

    let emulator = new Emulator(options);

    return emulator.start()
      .then(emulator.stop.bind(emulator))
      .then(emulator.stop.bind(emulator));
  });

  it('process.exit should kill child processes', function (done) {
    this.timeout(10000);

    process.env.GCLOUD_PROJECT = 'test';

    let options = {
      debug: true,
      useDocker: true
    };

    let emulator = new Emulator(options);
    let calledDone = false;

    emulator.start()
      .then(() => {
        nodeCleanup(() => {
          if (!calledDone) {
            calledDone = true;
            setTimeout(done, 2000);
          }
        });

        process.kill(process.pid);
      })
  })
});
