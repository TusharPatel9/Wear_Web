const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // one customer can give only single review on specific product
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    //images:array
  },
  {
    timestamps: true,
  }
);

// One user can review a product only once
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
