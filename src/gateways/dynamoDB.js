const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-southeast-2' });

/**
 * Gets the DynamoDB DocumentClient
 * 
 * @returns a DynamoDB DocumentClient
 */
const getClient = () => new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = {
  getClient
};
