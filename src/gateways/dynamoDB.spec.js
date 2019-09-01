const { expect } = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');

const dynamoDB = require('./dynamoDB');

const sandbox = sinon.createSandbox();

describe('dynamoDB', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('getClient', () => {
    it('will return a DocumentClient', () => {
      const client = dynamoDB.getClient();

      expect(client).to.be.instanceOf(AWS.DynamoDB.DocumentClient);
    });
  });
  

  // describe('putItem', () => {
  //   it('will call the client with the correct parameters', async () => {
  //     const item = { id: 'someItemId' };
  //     const tableName = 'someTableName';

  //     const putStub = sandbox.stub().returns({
  //       promise: () => Promise.resolve()
  //     });
  //     sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns({ put: putStub });

  //     await dynamoDB.putItem(item, tableName);

  //     expect(putStub.calledOnce).to.equal(true);
  //     expect(putStub.firstCall.args).to.deep.equal([{
  //       TableName: tableName,
  //       Item: item
  //     }]);
  //   });
  // });

  // describe('getItem', () => {
  //   it('will call the client with the correct parameters', async () => {
  //     const id = 'someItemId';
  //     const tableName = 'someTableName';
  //     const item = { id };

  //     const getStub = sandbox.stub().returns({
  //       promise: () => Promise.resolve({ Item: item })
  //     });
  //     sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns({ get: getStub });

  //     const result = await dynamoDB.getItem(id, tableName);

  //     expect(getStub.calledOnce).to.equal(true);
  //     expect(getStub.firstCall.args).to.deep.equal([{
  //       TableName: tableName,
  //       Key: { id }
  //     }]);

  //     expect(result).to.deep.equal(item);
  //   });
  // });

  // describe('deleteItem', () => {
  //   it('will call the client with the correct parameters', async () => {
  //     const id = 'someItemId';
  //     const tableName = 'someTableName';

  //     const deleteStub = sandbox.stub().returns({
  //       promise: () => Promise.resolve()
  //     });
  //     sandbox.stub(AWS.DynamoDB, 'DocumentClient').returns({ delete: deleteStub });

  //     await dynamoDB.deleteItem(id, tableName);

  //     expect(deleteStub.calledOnce).to.equal(true);
  //     expect(deleteStub.firstCall.args).to.deep.equal([{
  //       TableName: tableName,
  //       Key: { id }
  //     }]);
  //   });
  // });
});
