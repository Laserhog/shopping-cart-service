const ShoppingCart = require('./ShoppingCart.entity');
const shoppingCartRepo = require('./shoppingCart.repo');

/**
 * Initializes a shopping cart and puts it in the dynamoDB
 */
const initializeShoppingCart = async () => {
  const shoppingCart = ShoppingCart.new();
  await shoppingCartRepo.putCart(shoppingCart);

  return shoppingCart;
};

module.exports = {
  initializeShoppingCart
};
