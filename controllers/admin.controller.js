const Product = require('../models/product.model');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product');
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price
  });
  product
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) return res.redirect('/');
    res.render('admin/edit-product', { product });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prod = new Product({
    id: req.params.productId,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price
  });
  prod.save(() => res.redirect('/admin/products'));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteById(req.body.productId, () => res.redirect('/admin/products'));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(({ products }) => {
    res.render('admin/products', { products });
  });
};
