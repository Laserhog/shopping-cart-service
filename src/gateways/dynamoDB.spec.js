const { expect } = require('chai');
const AWS = require('aws-sdk');

const dynamoDB = require('./dynamoDB');

describe('dynamoDB', () => {
  describe('getClient', () => {
    it('will return a DocumentClient', () => {
      const client = dynamoDB.getClient();

      expect(client).to.be.instanceOf(AWS.DynamoDB.DocumentClient);
    });
  });
});
