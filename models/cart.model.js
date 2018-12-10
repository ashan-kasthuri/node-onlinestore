const fs = require('fs');
const path = require('path');
const Big = require('big.js');

const rootDirName = require('../util/path');

const getCartFromfile = cb => {
  const filePath = path.join(rootDirName, 'data', 'cart.json');
  fs.readFile(filePath, (err, fileContent) => {
    if (err || fileContent.length === 0) {
      return cb({
        filePath,
        cart: {
          products: [],
          totalPrice: 0
        }
      });
    }
    return cb({ filePath, cart: JSON.parse(fileContent) });
  });
};

module.exports = class Cart {
  static addProduct(id, productPrice) {
    getCartFromfile(({ filePath, cart }) => {
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );

      if (existingProductIndex > -1) {
        const existingProduct = cart.products[existingProductIndex];
        const prodReplacement = { ...existingProduct };
        prodReplacement.qty += 1;
        cart.products[existingProductIndex] = prodReplacement;
      } else {
        cart.products = [...cart.products, { id, qty: 1 }];
      }

      cart.totalPrice = Big(cart.totalPrice).plus(Big(+productPrice));

      // write the updated data back in to the file
      fs.writeFile(filePath, JSON.stringify(cart), err => {
        console.error(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    getCartFromfile(({ filePath, cart }) => {
      const updatedCart = { ...cart };

      // remove product
      const prodIndex = updatedCart.products.findIndex(prod => prod.id === id);
      if (prodIndex === -1) return;
      const removedProduct = updatedCart.products.splice(prodIndex, 1)[0];

      // update cart total
      updatedCart.totalPrice = Big(updatedCart.totalPrice).minus(
        Big(productPrice).times(removedProduct.qty)
      );

      // write the updated cart data back in to the file
      fs.writeFile(filePath, JSON.stringify(updatedCart), err => {
        console.error(err);
      });
    });
  }

  static getCart(cb) {
    getCartFromfile(({ cart }) => cb(cart));
  }
};
