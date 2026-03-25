const {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductBySellerId,
  updateProduct,
  getProductById,
} = require("../controllers/ProductController");
const { validateToken } = require("../middleware/AuthMiddleware");
const upload = require("../middleware/FileUpload");

const productRoutes = require("express").Router();

productRoutes.post(
  "/product",
  validateToken,
  upload.array("images", 5),
  addProduct
);
productRoutes.get("/products", getAllProducts);
productRoutes.get("/product-by-seller", validateToken, getProductBySellerId);
productRoutes.get("/product-by-id/:id", getProductById);
productRoutes.delete("/delete-product/:id", validateToken, deleteProduct);
productRoutes.put(
  "/update-product/:id",
  validateToken,
  upload.array("images"),
  updateProduct
);

module.exports = productRoutes;
