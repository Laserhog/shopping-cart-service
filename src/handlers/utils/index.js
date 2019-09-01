const { isMatchEndpoint } = require('./resourceMatcher');
const { buildSuccessfulLambdaResponse, buildFailureLambdaResponse } = require('./responseBuilder');

module.exports = {
  isMatchEndpoint,
  buildFailureLambdaResponse,
  buildSuccessfulLambdaResponse
}