const R = require('ramda');
const uuid = require('uuid');

class ShoppingCart {
  /**
   * Constructs a ShoppingCart object based on provided data
   * 
   * @param {object} shoppingCartData
   * @param {string} shoppingCartData.id cart_{guid}
   * @param {array} shoppingCartData.items
   * @param {string} shoppingCartData.items.id
   * @param {string} shoppingCartData.items.name
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

  /**
   * Adds a quantity of a product to the shopping cart
   * 
   * @param {object} product
   * @param {number} quantity 
   */
  addItem (product, quantity) {
    let item = R.find(R.propEq('id', product.id), this.items);

    if (R.isNil(item)) {
      item = { ...product, quantity }
      this.items.push(item);
    } else item.quantity += quantity;

    if (item.quantity <= 0) {
      this.items = R.reject(R.propEq('id', product.id), this.items);
    } else item.total = +(item.quantity * product.unitPrice).toFixed(2);

    const totalCost = R.reduce((acc, item) => acc + R.prop('total', item), 0, this.items);
    this.totalCost = +(totalCost).toFixed(2);

    this.lastUpdatedDate = new Date().toISOString();
  };

/**
 * Removes the specified product from the items array
 * 
 * @param {string} productId 
 */
  removeItem (productId) {
    this.items = R.reject(R.propEq('id', productId), this.items);

    const totalCost = R.reduce((acc, item) => acc + R.prop('total', item), 0, this.items);
    this.totalCost = +(totalCost).toFixed(2);

    this.lastUpdatedDate = new Date().toISOString();
  };
};

module.exports = ShoppingCart;