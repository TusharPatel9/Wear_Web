const { addProduct, getAllProducts, deleteProduct } = require("../controllers/ProductController");

const productRoutes = require("express").Router();

productRoutes.post("/product", addProduct)
productRoutes.get("/products", getAllProducts)
productRoutes.delete("/:id", deleteProduct)

module.exports = productRoutes;
