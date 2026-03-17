const { addProduct, getAllProducts, deleteProduct } = require("../controllers/ProductController");
const upload = require("../middleware/FileUpload");

const productRoutes = require("express").Router();

productRoutes.post("/product",upload.array("images",5),addProduct)
productRoutes.get("/products", getAllProducts)
productRoutes.delete("/:id", deleteProduct)

module.exports = productRoutes;
