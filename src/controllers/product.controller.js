const { sendError, MESSAGE, sendResponseOk } = require("../others/response");
const {
  getByProductId,
  getAllProducts,
  newProduct,
  getProductByCod,
} = require("../service/productService");

module.exports = {
  async getProductById(req, res) {
    try {
      const product = await getByProductId(req.params.id);

      if (!product) {
        return sendError(res, "Producto no encontrado", 400);
      }

      return sendResponseOk(res, product);
    } catch (error) {
      return sendError(res, error.message, error.statusCode);
    }
  },
  async getAllProducts(req, res) {
    try {
      const products = await getAllProducts();

      return sendResponseOk(res, products);
    } catch (error) {
      return sendError(res, MESSAGE.ERROR_SERVIDOR);
    }
  },
  async newProduct(req, res) {
    try {
      const { content, typePackaging, ...packaging } = req.body;
      console.log(packaging);
      console.log(req.body);

      const produc = await newProduct(content, typePackaging, packaging);

      res.status(201).json({
        success: true,
        message: "Producto creado",
        data: produc,
      });
    } catch (error) {
      console.log(error);
      sendError(res, error.message, 500);
    }
  },
  async getProductByCod(req, res) {
    try {
      const cod = req.query.cod;
      console.log("2")

      const produc = await getProductByCod(cod);
      console.log(produc)

      res.status(200).json(produc);
    } catch (error) {
      console.log(error);
      sendError(res, error.message, 500);
    }
  },
};
