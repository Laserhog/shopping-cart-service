const { expect } = require('chai');
const sinon = require('sinon');

const ShoppingCart = require('./ShoppingCart.entity');
const shoppingCartRepo = require('./shoppingCart.repo');
const shoppingCartService = require('./shoppingCart.service');
const { productListService } = require('../productList');

const sandbox = sinon.createSandbox();

describe('shoppingCart.service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('initializeShoppingCart', () => {
    it('will successfully initialize a shopping cart', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(ShoppingCart, 'new').returns(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();

      const result = await shoppingCartService.initializeShoppingCart();

      expect(shoppingCartRepo.putCart.calledOnce).to.equal(true);
      expect(shoppingCartRepo.putCart.firstCall.args).to.deep.equal([shoppingCart]);

      expect(result).to.deep.equal(shoppingCart);
    });
  });

  describe('getShoppingCart', () => {
    it('will successfully get a shopping cart', async () => {
      const shoppingCart = ShoppingCart.new();
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);

      const result = await shoppingCartService.getShoppingCart(
        shoppingCart.id
      );

      expect(shoppingCartRepo.getCartById.calledOnce).to.equal(true);
      expect(shoppingCartRepo.getCartById.firstCall.args).to.deep.equal([shoppingCart.id]);

      expect(result).to.deep.equal(shoppingCart);
    });
  });

  describe('addToShoppingCart', () => {
    it('will successfully add an item and add put into repo', async () => {
      const shoppingCart = ShoppingCart.new();
      const product = { id: 'someId', name: 'someName', unitPrice: 12.2 };
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();
      sandbox.stub(productListService, 'getProductData').returns(product);
      sandbox.spy(shoppingCart, 'addItem');

      const result = await shoppingCartService.addToShoppingCart(
        shoppingCart.id,
        product.id,
        2
      );

      expect(shoppingCartRepo.getCartById.calledOnce).to.equal(true);
      expect(shoppingCartRepo.getCartById.firstCall.args).to.deep.equal([shoppingCart.id]);

      expect(productListService.getProductData.calledOnce).to.equal(true);
      expect(productListService.getProductData.firstCall.args).to.deep.equal([product.id]);

      expect(shoppingCart.addItem.calledOnce).to.equal(true);
      expect(shoppingCart.addItem.firstCall.args).to.deep.equal([product, 2]);

      expect(shoppingCartRepo.putCart.calledOnce).to.equal(true);
      expect(shoppingCartRepo.putCart.firstCall.args).to.deep.equal([shoppingCart]);

      expect(result).to.deep.equal(shoppingCart);
    });
  });

  describe('deleteFromShoppingCart', () => {
    it('will successfully remove an item and update the repo', async () => {
      const shoppingCart = ShoppingCart.new();
      const productId = 'someId';
      sandbox.stub(shoppingCartRepo, 'getCartById').resolves(shoppingCart);
      sandbox.stub(shoppingCartRepo, 'putCart').resolves();
      sandbox.spy(shoppingCart, 'removeItem');

      const result = await shoppingCartService.deleteFromShoppingCart(
        shoppingCart.id,
        productId
      );

      expect(shoppingCartRepo.getCartById.calledOnce).to.equal(true);
      expect(shoppingCartRepo.getCartById.firstCall.args).to.deep.equal([shoppingCart.id]);

      expect(shoppingCart.removeItem.calledOnce).to.equal(true);
      expect(shoppingCart.removeItem.firstCall.args).to.deep.equal([productId]);

      expect(shoppingCartRepo.putCart.calledOnce).to.equal(true);
      expect(shoppingCartRepo.putCart.firstCall.args).to.deep.equal([shoppingCart]);

      expect(result).to.deep.equal(shoppingCart);
    });
  });
  
});
