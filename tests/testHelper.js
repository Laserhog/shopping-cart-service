const R = require('ramda');
const uuid = require('uuid/v4');

const { handler } = require('../src/index');

/**
 * Replaces the first 8 characters of a guid with `ffffffff`
 * @returns {string} modified guid
 */
const getTestUUID = () => R.replace(/^.{8}/, 'ffffffff', uuid());

/**
 * Execute the handler with the provided paramaters
 *
 * @param {Object} params
 * @param {string} params.httpMethod
 * @param {string} params.resourcePath
 * @param {string} params.body
 * @param {Object} params.pathParameters
 * @param {Object} params.headers
 * @returns {Promise}
 */
const executeEvent = params => handler({
  resource: params.resourcePath,
  body: params.body,
  httpMethod: params.httpMethod,
  pathParameters: params.pathParameters,
  headers: params.headers
});

module.exports = {
  getTestUUID,
  executeEvent
};
