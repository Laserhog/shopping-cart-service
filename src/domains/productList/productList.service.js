const R = require('ramda');

const productList = require('./data/productList.json');
const { NotFoundError, errorCodes } = require('../../exceptions');

/**
 * Gets the whole product list
 * @returns {array} array of product objects
 */
const getProductList = () => {
  return productList;
};

/**
 * Gets product data of the specified product id
 * @param {string} productId 
 * @returns {object} product data
 */
const getProductData = (productId) => {
  const product = R.find(R.propEq('id', productId), productList);

  if (R.isNil(product)) {
    throw new NotFoundError(errorCodes.unknownProduct, { productId });
  } else return product;
};

module.exports = {
  getProductList,
  getProductData
}