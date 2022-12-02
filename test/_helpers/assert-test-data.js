const { expect } = require('chai');
const { Datastore } = require('@google-cloud/datastore');

const { getTestKeyOptions, TEST_DATA } = require('./constants.js')

module.exports = async function assertTestData(result) {
  expect(result.length).to.be.equal(1);
  const entity = result[0];
  expect(Object.getOwnPropertyNames(entity)).to.be.deep.equal([ 'testProp' ]);

  const testKeyOption = getTestKeyOptions();
  const key = entity[Datastore.KEY].serialized;
  expect(key.namespace).to.be.equal(testKeyOption.namespace);
  expect(key.path.length).to.be.equal(2);
  expect(key.path[0]).to.be.equal(testKeyOption.path[0]);

  expect(entity.testProp).to.be.deep.equal(TEST_DATA.testProp);
}
