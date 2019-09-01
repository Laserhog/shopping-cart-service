const R = require('ramda');

const dynamoDB = require('../../gateways/dynamoDB');
const ShoppingCart = require('./ShoppingCart.entity');
const { BadGatewayError, NotFoundError, errorCodes } = require('../../exceptions')

const TableName = 'shopping-carts';

/**
 * Puts the provided shopping cart into table
 * 
 * @param {ShoppingCart} shoppingCart 
 */
const putCart = async (shoppingCart) => {
  const params = {
    TableName,
    Item: shoppingCart
  };

  try {
    await dynamoDB.getClient().put(params).promise();
  } catch (error) {
    throw new BadGatewayError(
      errorCodes.dynamoDBFailedToPut,
      {
        params,
        innerError: error.message
      }
    );
  }
};

/**
 * Gets the item of the specified id
 * 
 * @param {string} id 
 * @returns {ShoppingCart} 
 */
const getCartById = async (id) => {
  const params = {
    TableName,
    Key: { id }
  };

  try {
    const item = await dynamoDB.getClient().get(params).promise();
    if (R.isNil(item.Item)) {
      throw new NotFoundError(
        errorCodes.dynamoDBItemNotFound,
        { params }
      );
    }
    return new ShoppingCart(item.Item);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new BadGatewayError(
      errorCodes.dynamoDBFailedToGet,
      {
        params,
        innerError: error.message
      }
    );
  }
};

/**
 * Deletes the item of the specified id
 * 
 * @param {string} id 
 */
const deleteCartById = async (id) => {
  const params = {
    TableName,
    Key: { id }
  };

  try {
    await dynamoDB.getClient().delete(params).promise();
  } catch (error) {
    throw new BadGatewayError(
      errorCodes.dynamoDBFailedToDelete,
      {
        params,
        innerError: error.message
      }
    );
  }
};

module.exports = {
  putCart,
  getCartById,
  deleteCartById
};
