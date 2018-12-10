const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product/:productId', adminController.postEditProduct);

// /admin/delete-product => DELETE
router.post('/delete-product/', adminController.deleteProduct)

// admin/products
router.get('/products', adminController.getProducts);

module.exports = router;
