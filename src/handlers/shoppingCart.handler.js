const { isMatchEndpoint, buildFailureLambdaResponse, buildSuccessfulLambdaResponse } = require('./utils');
const { shoppingCartService }  = require('../domains/shoppingCart');

/**
 * Gets handler mappings for the shoppingCartHandler.
 * The event object is passed into the provided function when the endpoint is matched.
 *
 * @returns list of Ramda conditions to check if endpoint matches and map to the function
 */
const getHandlerMapping = () => [
  [isMatchEndpoint('POST', '/init'), initializeShoppingCart]
];

/**
 * Initialize a shopping cart
 * 
 * @returns {object} lambda success/failure response
 */
const initializeShoppingCart = async () => {
  try {
    const result = await shoppingCartService.initializeShoppingCart();
    return buildSuccessfulLambdaResponse({
      statusCode: 200,
      result
    });
  } catch (error) {
    return buildFailureLambdaResponse({ error });
  }
};

module.exports = {
  initializeShoppingCart,
  getHandlerMapping
};
