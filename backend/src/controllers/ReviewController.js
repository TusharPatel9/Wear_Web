const Review = require("../models/ReviewModel");
const uploadToCloudinary = require("../utils/Cloudinary");

// ADD REVIEW WITH IMAGES
exports.addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    // ✅ Create review
    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    //  Handle duplicate review error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};

// 2. GET PRODUCT REVIEWS
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Review Fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// 3. GET USER REVIEWS
// exports.getUserReviews = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const reviews = await Review.find({ userId }).populate(
//       "productId",
//       "title price images"
//     );

//     res.status(200).json({
//       success: true,
//       data: reviews,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user reviews",
//       error: error.message,
//     });
//   }
// };

// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // ✅ Delete review
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};
