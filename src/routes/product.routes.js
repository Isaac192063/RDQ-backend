const { Router } = require("express");
const prisma = require("../config/prisma");
const { newProduct } = require("../service/productService");
const productController = require("../controllers/product.controller.js");
const routerProduct = Router();

routerProduct.post("", productController.newProduct);
routerProduct.get("/name/:id", productController.getProductById);
routerProduct.get("", productController.getAllProducts);
routerProduct.put("/:id", productController.updateProduct);
routerProduct.delete("/:id", productController.deleteProduct); // Nueva ruta para eliminar el producto
routerProduct.get("/content", async (req, res) => {
  const products = await prisma.content.findMany();
  return res.status(200).json(products);
});
routerProduct.get("/typePackaging", async (req, res) => {
  const products = await prisma.typePackaging.findMany();
  return res.status(200).json(products);
});
routerProduct.get("/search", productController.getProductByCod)

module.exports = routerProduct;
