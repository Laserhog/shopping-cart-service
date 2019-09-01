const R = require('ramda');
const { expect } = require('chai');

const productListService = require('./productList.service');

describe('productList.service', () => {
  describe('getProductList', () => {
    it('will retrieve the product list', () => {
      const result = productListService.getProductList();

      expect(result.length).to.equal(7);
      R.forEach(product => {
        expect(product).to.have.keys(['id', 'name', 'unitPrice']);
      }, result);
    });
  });

  describe('getProductData', () => {
    it('will retrieve product data for a specified product id', () => {
      const result = productListService.getProductData('product_91f12c45-5413-4283-bff0-76b7c5b0cf3a');

      expect(result).to.deep.equal({
        id: 'product_91f12c45-5413-4283-bff0-76b7c5b0cf3a',
        name: 'Sledgehammer',
        unitPrice: 125.76
      });
    });
  });
  
});
