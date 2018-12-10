const fs = require('fs');
const path = require('path');

const rootDirName = require('../util/path');
const Cart = require('../models/cart.model');

const getProductsFromfile = cb => {
  const filePath = path.join(rootDirName, 'data', 'products.json');
  fs.readFile(filePath, (err, fileContent) => {
    if (err) return cb({ filePath, products: [] });
    return cb({ filePath, products: JSON.parse(fileContent) });
  });
};

module.exports = class Product {
  constructor({ id = null, title, imageUrl, description, price }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(cb) {
    getProductsFromfile(({ products, filePath }) => {
      if (this.id) {
        // editing an existing product
        const existingProdIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProdIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
          if (err) console.log('error', err);
        });
      } else {
        // a brand new product
        this.id = Math.random().toString();

        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), err => {
          if (err) console.error('error', err);
        });
      }
    });
    if (cb) cb();
  }

  static deleteById(productId, cb) {
    getProductsFromfile(({ products, filePath }) => {
      const prodToRemove = products.find(prod => prod.id === productId);
      const updatedProducts = products.filter(prod => prod.id !== productId);
      if (updatedProducts.length < products.length) {
        fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
          if (!err) {
            // remove product from cart if it's already there
            Cart.deleteProduct(productId, prodToRemove.price);
          }
          console.error('error', err);
        });
      }
    });
    if (cb) cb();
  }

  static fetchAll(cb) {
    getProductsFromfile(cb);
  }

  static findById(id, cb) {
    getProductsFromfile(({ products }) => {
      const product = products.find(p => p.id === id);
      if (cb) cb(product);
    });
  }
};
