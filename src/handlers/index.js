const R = require('ramda');

const { isMatchEndpoint } = require('./utils')
const errorHandler = require('./error.handler');
const shoppingCartHandler = require('./shoppingCart.handler');
const productListHandler = require('./productList.handler');

/**
 * Finds the handler based on the provided handler mappings
 */
const findHandler = () => R.cond([
  // shoppingCart
  [isMatchEndpoint('GET', '/{cartId}'), shoppingCartHandler.getShoppingCart],
  [isMatchEndpoint('POST', '/init'), shoppingCartHandler.initializeShoppingCart],
  [isMatchEndpoint('PUT', '/{cartId}/add'), shoppingCartHandler.addToShoppingCart],

  // productList
  [isMatchEndpoint('GET', '/products'), productListHandler.getProductList],

  // errorHandler (no mapping)
  [R.T, errorHandler]
]);

module.exports = {
  findHandler
};
