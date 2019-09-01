const { expect } = require('chai');
const sinon = require('sinon');
const uuid = require('uuid');

const ShoppingCart = require('./ShoppingCart.entity');

const sandbox = sinon.createSandbox();

describe('ShoppingCart.entity', () => {
  let now;
  
  beforeEach(() => {
    now = new Date();
    sandbox.useFakeTimers(now.getTime());
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor', () => {
    it('will build a ShoppingCart based on provided data', () => {
      const shoppingCartData = {
        id: 'someId',
        items: [],
        totalCost: 0,
        createdDate: 'someDate',
        lastUpdatedDate: 'someDate',
        extraField: 'will be excluded from ShoppingCart'
      };

      const shoppingCart = new ShoppingCart(shoppingCartData);

      expect(shoppingCart).to.be.instanceOf(ShoppingCart);
      expect(shoppingCart).to.deep.equal({
        id: 'someId',
        items: [],
        totalCost: 0,
        createdDate: 'someDate',
        lastUpdatedDate: 'someDate'
      });
    });
  });

  describe('new', () => {
    it('will create a new ShoppingCart', () => {
      sandbox.stub(uuid, 'v4').returns('someId');

      const shoppingCart = ShoppingCart.new();

      expect(shoppingCart).to.be.instanceOf(ShoppingCart);
      expect(shoppingCart).to.deep.equal({
        id: 'cart_someId',
        items: [],
        totalCost: 0,
        createdDate: now.toISOString(),
        lastUpdatedDate: now.toISOString()
      });
    });
  });

  describe('addItem', () => {
    it('will add to an existing item', () => {
      const shoppingCartData = {
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 2,
          total: 24.90
        }],
        totalCost: 24.90,
        createdDate: 'someDate',
        lastUpdatedDate: 'someDate'
      };

      const shoppingCart = new ShoppingCart(shoppingCartData);
      const product = {
        id: 'someProductId',
        name: 'someProduct',
        unitPrice: 12.45
      };
      
      shoppingCart.addItem(product, 2);

      expect(shoppingCart).to.deep.equal({
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 4,
          total: 49.8
        }],
        totalCost: 49.8,
        createdDate: 'someDate',
        lastUpdatedDate: now.toISOString()
      });
    });

    it('will add a new item', () => {
      const shoppingCartData = {
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 2,
          total: 24.90
        }],
        totalCost: 24.90,
        createdDate: 'someDate',
        lastUpdatedDate: 'someDate'
      };

      const shoppingCart = new ShoppingCart(shoppingCartData);
      const product = {
        id: 'someOtherProductId',
        name: 'someOtherProduct',
        unitPrice: 15.95
      };

      shoppingCart.addItem(product, 3);

      expect(shoppingCart).to.deep.equal({
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 2,
          total: 24.90
        }, {
          id: 'someOtherProductId',
          name: 'someOtherProduct',
          unitPrice: 15.95,
          quantity: 3,
          total: 47.85
        }],
        totalCost: 72.75,
        createdDate: 'someDate',
        lastUpdatedDate: now.toISOString()
      });
    });

    it('will not go below 0 quantity', () => {
      const shoppingCartData = {
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 2,
          total: 24.90
        }],
        totalCost: 24.90,
        createdDate: 'someDate',
        lastUpdatedDate: 'someDate'
      };

      const shoppingCart = new ShoppingCart(shoppingCartData);
      const product = {
        id: 'someProductId',
        name: 'someProduct',
        unitPrice: 12.45
      };
      
      shoppingCart.addItem(product, -3);

      expect(shoppingCart).to.deep.equal({
        id: 'someId',
        items: [{
          id: 'someProductId',
          name: 'someProduct',
          unitPrice: 12.45,
          quantity: 0,
          total: 0
        }],
        totalCost: 0,
        createdDate: 'someDate',
        lastUpdatedDate: now.toISOString()
      });
    });
  });
  
});
