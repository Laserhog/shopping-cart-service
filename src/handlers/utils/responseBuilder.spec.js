const { expect } = require('chai');

const responseBuilder = require('./responseBuilder');

describe('responseBuilder', () => {
  describe('buildSuccessfulLambdaResponse', () => {
    it('will build a successful lambda response', () => {
      const statusCode = 201;
      const result = {
        someResult: 'resultValue'
      };
      const headers = {
        someHeader: 'headerValue'
      };

      const response = responseBuilder.buildSuccessfulLambdaResponse({
        statusCode,
        result,
        headers
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers,
        statusCode,
        body: JSON.stringify(result)
      });
    });
  });

  describe('buildFailureLambdaResponse', () => {
    it('will build a sucessful lambda response with status code defined in error', () => {
      const error = {
        statusCode: 404,
        message: 'not found',
        code: 1,
        moreInfo: 'something else'
      };
      const headers = {
        someHeader: 'headerValue'
      };

      const response = responseBuilder.buildFailureLambdaResponse({
        error,
        headers
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers,
        statusCode: error.statusCode,
        body: JSON.stringify({
          message: error.message,
          code: error.code,
          moreInfo: error.moreInfo
        })
      });
    });

    it('will build a sucessful lambda response with default 500 status code', () => {
      const error = {
        message: 'some error',
        code: 1,
        moreInfo: 'something else'
      };
      const headers = {
        someHeader: 'headerValue'
      };

      const response = responseBuilder.buildFailureLambdaResponse({
        error,
        headers
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers,
        statusCode: 500,
        body: JSON.stringify({
          message: error.message,
          code: error.code,
          moreInfo: error.moreInfo
        })
      });
    });
  });
});
