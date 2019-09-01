const { buildFailureLambdaResponse, buildSuccessfulLambdaResponse } = require('./utils');
const { shoppingCartService }  = require('../domains/shoppingCart');

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

/**
 * Gets the shopping cart of the specified id
 * 
 * @param {object} event - lambda event
 * @param {object} event.pathParameters
 * @param {string} event.pathParameters.cartId
 */
const getShoppingCart = async (event) => {
  try {
    const result = await shoppingCartService.getShoppingCart(event.pathParameters.cartId);
    return buildSuccessfulLambdaResponse({
      statusCode: 200,
      result
    });
  } catch (error) {
    return buildFailureLambdaResponse({ error });
  }
}

module.exports = {
  initializeShoppingCart,
  getShoppingCart,
};
