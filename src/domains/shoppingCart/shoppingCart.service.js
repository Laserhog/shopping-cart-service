const ShoppingCart = require('./ShoppingCart.entity');
const shoppingCartRepo = require('./shoppingCart.repo');

/**
 * Initializes a shopping cart and puts it in the dynamoDB
 * 
 * @returns {object} initialized shopping cart
 */
const initializeShoppingCart = async () => {
  const shoppingCart = ShoppingCart.new();
  await shoppingCartRepo.putCart(shoppingCart);

  return shoppingCart;
};

/**
 * Gets the specified shopping cart
 * 
 * @param {string} cartId cart_{guid}
 * @returns {object} retrieved shopping cart
 */
const getShoppingCart = async (cartId) => {
  const shoppingCart = await shoppingCartRepo.getCartById(cartId);

  return shoppingCart;
};

module.exports = {
  initializeShoppingCart,
  getShoppingCart
};
