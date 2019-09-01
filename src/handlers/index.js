const R = require('ramda');

const { isMatchEndpoint } = require('./utils')
const errorHandler = require('./error.handler');
const shoppingCartHandler = require('./shoppingCart.handler');

/**
 * Finds the handler based on the provided handler mappings
 * @param {object} event 
 */
const findHandler = () => R.cond([
  [isMatchEndpoint('GET', '/{cartId}'), shoppingCartHandler.getShoppingCart],
  [isMatchEndpoint('POST', '/init'), shoppingCartHandler.initializeShoppingCart],
  [R.T, errorHandler]
]);

module.exports = {
  findHandler
};
