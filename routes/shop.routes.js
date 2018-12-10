const express = require('express');

const shopController = require('../controllers/shop.controller.js');

const router = express.Router();

// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => POST
router.post('/cart', shopController.postCart);

// /cart-delete-product => POST
router.post('/cart-delete-product', shopController.postCartDeleteProduct);

// /orders => GET
router.get('/orders', shopController.getOrders);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

// /products/:id => GET
router.get('/products/:productId', shopController.getProduct);

module.exports = router;
