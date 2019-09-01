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
    it('200 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(ShoppingCart, 'new').returns(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const response = await testHelper.executeEvent({
        httpMethod: 'POST',
        resourcePath: '/init'
      });
  
      expect(response).to.have.keys([
        'isBase64Encoded',
        'headers',
        'statusCode',
        'body'
      ]);
      expect(response.isBase64Encoded).to.equal(false);
      expect(response.headers).to.equal(undefined);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal(JSON.stringify(shoppingCart));
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'putCart').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'POST',
        resourcePath: '/init'
      });

      expect(response).to.have.keys([
        'isBase64Encoded',
        'headers',
        'statusCode',
        'body'
      ]);
      expect(response.isBase64Encoded).to.equal(false);
      expect(response.headers).to.equal(undefined);
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.equal(JSON.stringify(errorToThrow));
    });
  });

  describe('GET /{cartId}', () => {
    it('200 success', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(ShoppingCart, 'new').returns(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);

      const response = await testHelper.executeEvent({
        httpMethod: 'GET',
        resourcePath: '/{cartId}',
        pathParameters: shoppingCart.id
      });
  
      expect(response).to.have.keys([
        'isBase64Encoded',
        'headers',
        'statusCode',
        'body'
      ]);
      expect(response.isBase64Encoded).to.equal(false);
      expect(response.headers).to.equal(undefined);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal(JSON.stringify(shoppingCart));
    });

    it('error', async () => {
      const errorToThrow = { message: 'some error' };
      sandbox.stub(shoppingCartRepo, 'getCartById').rejects(errorToThrow);

      const response = await testHelper.executeEvent({
        httpMethod: 'GET',
        resourcePath: '/{cartId}',
        pathParameters: 'someId'
      });

      expect(response).to.have.keys([
        'isBase64Encoded',
        'headers',
        'statusCode',
        'body'
      ]);
      expect(response.isBase64Encoded).to.equal(false);
      expect(response.headers).to.equal(undefined);
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.equal(JSON.stringify(errorToThrow));
    });
  });
});
