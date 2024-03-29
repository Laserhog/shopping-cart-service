/**
 * Build a successful lambda response
 * @returns {object} success response
 */
const buildSuccessfulLambdaResponse = ({ statusCode, result, headers }) => ({
  isBase64Encoded: false,
  headers,
  statusCode,
  body: JSON.stringify(result)
});

/**
 * Build a failure lambda response
 * @returns {object} failure response
 */
const buildFailureLambdaResponse = ({ error, headers }) => ({
  isBase64Encoded: false,
  headers,
  statusCode: error.statusCode || 500,
  body: JSON.stringify({
    message: error.message,
    code: error.code,
    moreInfo: error.moreInfo
  })
});

module.exports = {
  buildSuccessfulLambdaResponse,
  buildFailureLambdaResponse
};
