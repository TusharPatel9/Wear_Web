const Product = require("../models/ProductModel");
const uploadToCloudinary = require("../utils/Cloudinary");

exports.addProduct = async (req, res) => {
  try {
    //sellerID
    const sellerId = req.user._id;

    const {
      categoryId,
      title,
      description,
      price,
      quantity,
      size,
      colors,
      sku,
    } = req.body;

    // if (!title || !description || !price || !quantity || !size || !colors || !sku)  {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    const imageUrls = [];

    for (let file of req.files) {
      const result = await uploadToCloudinary(file.path);
      imageUrls.push(result.secure_url);
    }

    console.log(imageUrls);

    try {
      const createdProduct = await Product.create({
        sellerId,
        categoryId,
        title,
        description,
        price,
        quantity,
        size,
        colors,
        sku,
        imagePaths: imageUrls,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: createdProduct,
      });
    } catch (error) {
      console.log("error", error);
    }
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
    const sellerId = req.user._id;
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      sellerId,
    });
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

//get Product By Seller ID
exports.getProductBySellerId = async (req, res) => {
  try {
    const sellerId = req.user._id;

    //  2. Validate sellerId
    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller ID is missing",
      });
    }

    // 3. Role-based validation
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Only sellers can view their products",
      });
    }

    const fetchedProducts = await Product.find({ sellerId });

    // Handle empty result
    if (!fetchedProducts || fetchedProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this seller",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: fetchedProducts.length,
      data: fetchedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Error while fetching products",
    });
  }
};

// update a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // ✅ 1. Find existing product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedImages = [...product.imagePaths];

    // ✅ 2. REMOVE IMAGES
    if (req.body.removeImages) {
      let removeImages = req.body.removeImages;

      // convert string → array
      if (typeof removeImages === "string") {
        removeImages = JSON.parse(removeImages);
      }

      updatedImages = updatedImages.filter(
        (img) => !removeImages.includes(img)
      );

      // 🔥 OPTIONAL: delete from Cloudinary
      // for (let img of removeImages) {
      //   await deleteFromCloudinary(img);
      // }
    }

    // ✅ 3. ADD NEW IMAGES
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.path);
        updatedImages.push(result.secure_url);
      }
    }

    // ✅ 4. Prepare update data
    const updateData = {
      ...req.body,
      imagePaths: updatedImages,
    };

    // remove unwanted field
    delete updateData.removeImages;

    // ✅ convert colors if needed
    if (updateData.colors && typeof updateData.colors === "string") {
      updateData.colors = updateData.colors.split(",");
    }

    // ✅ 5. Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);

    res.status(500).json({
      success: false,
      message: "Error while updating product",
    });
  }
};
// get product by product ID single product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchedProduct = await Product.findById(id);

    // Handle empty result
    if (!fetchedProduct) {
      return res.status(404).json({
        success: false,
        message: "No products found for this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: fetchedProduct,
    });
    console.log(fetchedProduct);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Error while fetching products",
    });
  }
};
