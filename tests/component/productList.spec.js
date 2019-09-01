const { expect } = require('chai');

const productList = require('../../src/domains/productList/data/productList.json');

const testHelper = require('../testHelper');

describe('productList', () => {
  describe('GET /products', () => {
    it('200 success', async () => {
      const response = await testHelper.executeEvent({
        httpMethod: 'GET',
        resourcePath: '/products'
      });
    
      expect(response).to.deep.equal({
        isBase64Encoded: false,
        headers: undefined,
        statusCode: 200,
        body: JSON.stringify(productList)
      });
    });
  });
});
