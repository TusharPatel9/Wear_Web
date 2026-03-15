const Product = require("../models/ProductModel");

exports.addProduct = async (req, res) => {
  try {
    const { categoryId, title, description, price, quantity, size, colors, sku } = req.body;

    if (!categoryId || !title || !description || !price || !quantity || !size || !colors || !sku) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const createdProduct = await Product.create({
      categoryId, title, description, price, quantity, size, colors, sku
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching products",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};