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
});
