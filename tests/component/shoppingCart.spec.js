const { expect } = require('chai');
const sinon = require('sinon');

const { shoppingCartRepo, ShoppingCart } = require('../../src/domains/shoppingCart')
const testHelper = require('../testHelper');

const sandbox = sinon.createSandbox();

describe('shoppingCart', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('POST /init', () => {
    it('201 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(ShoppingCart, 'new').returns(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const response = await testHelper.executeEvent({
        httpMethod: 'POST',
        resourcePath: '/init'
      });
  
      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 201,
        body: JSON.stringify(shoppingCart)
      });
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'putCart').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'POST',
        resourcePath: '/init'
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('GET /{cartId}', () => {
    it('200 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);

      const response = await testHelper.executeEvent({
        httpMethod: 'GET',
        resourcePath: '/{cartId}',
        pathParameters: shoppingCart.id
      });
  
      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(shoppingCart)
      });
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'getCartById').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'GET',
        resourcePath: '/{cartId}',
        pathParameters: 'someId'
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('PUT /{cartId}/item', () => {
    it('200 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const response = await testHelper.executeEvent({
        httpMethod: 'PUT',
        resourcePath: '/{cartId}/item',
        pathParameters: shoppingCart.id,
        body: JSON.stringify({
          productId: 'product_91f12c45-5413-4283-bff0-76b7c5b0cf3a',
          quantity: 2
        })
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(shoppingCart)
      });
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'getCartById').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'PUT',
        resourcePath: '/{cartId}/item',
        pathParameters: 'someId',
        body: JSON.stringify({
          productId: 'product_91f12c45-5413-4283-bff0-76b7c5b0cf3a',
          quantity: 2
        })
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });

  describe('DELETE /{cartId}/item', () => {
    it('200 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const response = await testHelper.executeEvent({
        httpMethod: 'PUT',
        resourcePath: '/{cartId}/item',
        pathParameters: shoppingCart.id,
        body: JSON.stringify({
          productId: 'product_91f12c45-5413-4283-bff0-76b7c5b0cf3a'
        })
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(shoppingCart)
      });
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'getCartById').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'PUT',
        resourcePath: '/{cartId}/item',
        pathParameters: 'someId',
        body: JSON.stringify({
          productId: 'product_91f12c45-5413-4283-bff0-76b7c5b0cf3a'
        })
      });

      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 500,
        body: JSON.stringify(errorToThrow)
      });
    });
  });
});
