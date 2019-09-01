const { expect } = require('chai');
const sinon = require('sinon');

const ShoppingCart = require('./ShoppingCart.entity');
const shoppingCartRepo = require('./shoppingCart.repo');
const shoppingCartService = require('./shoppingCart.service');

const sandbox = sinon.createSandbox();

describe('shoppingCart.service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('initializeShoppingCart', () => {
    it('will successfully initialize a shopping cart', async () => {
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const result = await shoppingCartService.initializeShoppingCart();

      expect(shoppingCartRepo.putCart.calledOnce).to.equal(true);
      expect(shoppingCartRepo.putCart.firstCall.args[0]).to.be.instanceOf(ShoppingCart);

      expect(result).to.be.instanceOf(ShoppingCart);
    });
  });
});
