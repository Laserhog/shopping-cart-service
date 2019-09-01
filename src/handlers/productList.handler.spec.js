const { expect } = require('chai');
const sinon = require('sinon');

const { productListService } = require('../domains/productList');
const productListHandler = require('./productList.handler');

const sandbox = sinon.createSandbox();

describe('productListHandler', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('getProductList', () => {
    it('will handle a successful response from the service', () => {
      const serviceResponse = [{ id: 'someId' }];
      sandbox.stub(productListService, 'getProductList').returns(serviceResponse);

      const result = productListHandler.getProductList();

      expect(productListService.getProductList.calledOnce).to.equal(true);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(productListService, 'getProductList').throws(errorToThrow);

      const result = productListHandler.getProductList();

      expect(productListService.getProductList.calledOnce).to.equal(true);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });
});
