const {Router} = require('express');
const prisma = require('../config/prisma');
const { newProduct } = require('../service/productService');
const productController = require('../controllers/product.controller.js')
const routerProduct = Router();

routerProduct.post("", productController.newProduct)
routerProduct.get("/:id", productController.getProductById);
routerProduct.get("", productController.getAllProducts);

module.exports = routerProduct;