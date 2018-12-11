const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/index', { products: rows });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/product-list', { products: rows });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([rows]) => res.render('shop/product-details', { product: rows[0] }))
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(({ products }) => {
      const allCartProductData = [];
      for (cartProduct of cart.products) {
        const product = products.find(p => p.id === cartProduct.id);
        allCartProductData.push({ productData: product, qty: cartProduct.qty });
      }
      res.render('shop/cart', {
        products: allCartProductData
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const product = Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders');
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout');
};
