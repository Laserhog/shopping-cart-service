const { expect } = require('chai');
const sinon = require('sinon');

const { shoppingCartService }  = require('../domains/shoppingCart');
const shoppingCartHandler = require('./shoppingCart.handler');

const sandbox = sinon.createSandbox();

describe('shoppingCart.handler', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('initializeShoppingCart', () => {
    it('will handle a successful response from the service', async () => {
      const serviceResponse = { id: 'someId' };
      sandbox.stub(shoppingCartService, 'initializeShoppingCart').resolves(serviceResponse);

      const result = await shoppingCartHandler.initializeShoppingCart();

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartService, 'initializeShoppingCart').rejects(errorToThrow);

      const result = await shoppingCartHandler.initializeShoppingCart();

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });
});
