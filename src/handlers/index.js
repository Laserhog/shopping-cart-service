const R = require('ramda');

const errorHandler = require('./error.handler');
const shoppingCartHandler = require('./shoppingCart.handler');

/**
 * Finds the handler based on the provided handler mappings
 * @param {object} event 
 */
const findHandler = event => R.cond([
  ...shoppingCartHandler.getHandlerMapping(event),
  [R.T, errorHandler]
]);

module.exports = {
  findHandler
};
