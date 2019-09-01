const { expect } = require('chai');

const { NotFoundError } = require('../../src/exceptions')
const testHelper = require('../testHelper');
const { shoppingCartRepo, ShoppingCart } = require('../../src/domains/shoppingCart');

describe('shoppingCart.repo', () => {
  it('can successfully put, get and delete for the shopping carts repo', async () => {
    const shoppingCart = ShoppingCart.new();
    const id = `cart_${testHelper.getTestUUID()}`;
    shoppingCart.id = id;

    await shoppingCartRepo.putCart(shoppingCart);

    const retrievedCart = await shoppingCartRepo.getCartById(id);
    expect(retrievedCart).to.deep.equal(shoppingCart);

    await shoppingCartRepo.deleteCartById(id);

    try {
      await shoppingCartRepo.getCartById(id);
      expect.fail('should error');
    } catch (error) {
      expect(error).to.be.instanceOf(NotFoundError);
    }
  });
});
