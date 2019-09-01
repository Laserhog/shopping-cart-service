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

      expect(shoppingCartService.initializeShoppingCart.calledOnce).to.equal(true);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 201,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartService, 'initializeShoppingCart').rejects(errorToThrow);

      const result = await shoppingCartHandler.initializeShoppingCart();

      expect(shoppingCartService.initializeShoppingCart.calledOnce).to.equal(true);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('getShoppingCart', () => {
    it('will handle a successful response from the service', async () => {
      const serviceResponse = { id: 'someId' };
      sandbox.stub(shoppingCartService, 'getShoppingCart').resolves(serviceResponse);

      const result = await shoppingCartHandler.getShoppingCart({
        pathParameters: { cartId: 'someId' }
      });

      expect(shoppingCartService.getShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.getShoppingCart.firstCall.args).to.deep.equal(['someId']);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartService, 'getShoppingCart').rejects(errorToThrow);

      const result = await shoppingCartHandler.getShoppingCart({
        pathParameters: { cartId: 'someId' }
      });

      expect(shoppingCartService.getShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.getShoppingCart.firstCall.args).to.deep.equal(['someId']);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('addToShoppingCart', () => {
    it('will handle a successful response from the service', async () => {
      const serviceResponse = { id: 'someId' };
      sandbox.stub(shoppingCartService, 'addToShoppingCart').resolves(serviceResponse);

      const result = await shoppingCartHandler.addToShoppingCart({
        pathParameters: { cartId: 'someId' },
        body: JSON.stringify({
          productId: 'someId',
          quantity: 2
        })
      });

      expect(shoppingCartService.addToShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.addToShoppingCart.firstCall.args).to.deep.equal([
        'someId',
        'someId',
        2
      ]);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartService, 'addToShoppingCart').rejects(errorToThrow);

      const result = await shoppingCartHandler.addToShoppingCart({
        pathParameters: { cartId: 'someId' },
        body: JSON.stringify({
          productId: 'someId',
          quantity: 2
        })
      });

      expect(shoppingCartService.addToShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.addToShoppingCart.firstCall.args).to.deep.equal([
        'someId',
        'someId',
        2
      ]);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('deleteFromShoppingCart', () => {
    it('will handle a successful response from the service', async () => {
      const serviceResponse = { id: 'someId' };
      sandbox.stub(shoppingCartService, 'deleteFromShoppingCart').resolves(serviceResponse);

      const result = await shoppingCartHandler.deleteFromShoppingCart({
        pathParameters: { cartId: 'someId' },
        body: JSON.stringify({
          productId: 'someId'
        })
      });

      expect(shoppingCartService.deleteFromShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.deleteFromShoppingCart.firstCall.args).to.deep.equal([
        'someId',
        'someId'
      ]);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(serviceResponse)
      });
    });

    it('will handle an error response from the service', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartService, 'deleteFromShoppingCart').rejects(errorToThrow);

      const result = await shoppingCartHandler.deleteFromShoppingCart({
        pathParameters: { cartId: 'someId' },
        body: JSON.stringify({
          productId: 'someId'
        })
      });

      expect(shoppingCartService.deleteFromShoppingCart.calledOnce).to.equal(true);
      expect(shoppingCartService.deleteFromShoppingCart.firstCall.args).to.deep.equal([
        'someId',
        'someId'
      ]);

      expect(result).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });
});
