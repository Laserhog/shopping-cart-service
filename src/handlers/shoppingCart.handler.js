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
      statusCode: 201,
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
    const result = await shoppingCartService.getShoppingCart(
      event.pathParameters.cartId
    );
    return buildSuccessfulLambdaResponse({
      statusCode: 200,
      result
    });
  } catch (error) {
    return buildFailureLambdaResponse({ error });
  }
};

/**
 * Adds an item to the shopping cart
 * 
 * @param {object} event - lambda event
 * @param {object} event.pathParameters
 * @param {string} event.pathParameters.cartId
 * @param {string} event.body
 */
const addToShoppingCart = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await shoppingCartService.addToShoppingCart(
      event.pathParameters.cartId,
      body.productId,
      body.quantity
    );
    return buildSuccessfulLambdaResponse({
      statusCode: 200,
      result
    });
  } catch (error) {
    return buildFailureLambdaResponse({ error });
  }
};

/**
 * Removes an item from the shopping cart
 * 
 * @param {object} event - lambda event
 * @param {object} event.pathParameters
 * @param {string} event.pathParameters.cartId
 * @param {string} event.body
 */
const deleteFromShoppingCart = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await shoppingCartService.deleteFromShoppingCart(
      event.pathParameters.cartId,
      body.productId
    );
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
  getShoppingCart,
  addToShoppingCart,
  deleteFromShoppingCart
};
