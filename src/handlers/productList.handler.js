const { buildFailureLambdaResponse, buildSuccessfulLambdaResponse } = require('./utils');
const { productListService } = require('../domains/productList');

/**
 * @returns {object} lambda success/failure response
 */
const getProductList = () => {
  try {
    const result = productListService.getProductList();
    return buildSuccessfulLambdaResponse({
      statusCode: 200,
      result
    });
  } catch (error) {
    return buildFailureLambdaResponse({ error });
  }
};

module.exports = {
  getProductList
};
