const ShoppingCart = require('./ShoppingCart.entity');
const shoppingCartRepo = require('./shoppingCart.repo');
const { productListService } = require('../productList')

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

/**
 * Adds a quantity of a specified product to the shopping cart
 * @param {string} cartId 
 * @param {string} productId 
 * @param {number} quantity
 * @returns {object} updated shopping cart
 */
const addToShoppingCart = async (cartId, productId, quantity) => {
  const shoppingCart = await shoppingCartRepo.getCartById(cartId);
  const product = productListService.getProductData(productId);

  shoppingCart.addItem(product, quantity);

  await shoppingCartRepo.putCart(shoppingCart);

  return shoppingCart;
};

module.exports = {
  initializeShoppingCart,
  getShoppingCart,
  addToShoppingCart
};
