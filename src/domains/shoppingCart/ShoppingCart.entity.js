const uuid = require('uuid');

class ShoppingCart {
  /**
   * Constructs a ShoppingCart object based on provided data
   * 
   * @param {object} shoppingCartData
   * @param {string} shoppingCartData.id cart_{guid}
   * @param {array} shoppingCartData.items
   * @param {string} shoppingCartData.items.productName
   * @param {number} shoppingCartData.items.price
   * @param {number} shoppingCartData.items.quantity
   * @param {number} shoppingCartData.items.total
   * @param {number} shoppingCartData.totalCost
   * @param {string} shoppingCartData.createdDate
   * @param {string} shoppingCartData.lastUpdatedDate
   */
  constructor (shoppingCartData) {
    this.id = shoppingCartData.id;
    this.items = shoppingCartData.items;
    this.totalCost = shoppingCartData.totalCost;
    this.createdDate = shoppingCartData.createdDate;
    this.lastUpdatedDate = shoppingCartData.lastUpdatedDate;
  };

  static new () {
    const currentDate = new Date().toISOString();

    return new ShoppingCart({
      id: `cart_${uuid.v4()}`,
      items: [],
      totalCost: 0,
      createdDate: currentDate,
      lastUpdatedDate: currentDate
    });
  };
};

module.exports = ShoppingCart;