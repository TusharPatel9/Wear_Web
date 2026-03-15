const wishlistRoutes = require("express").Router();  
const { addToWishlist, getWishlist, removeFromWishlist, clearWishlist } = require("../controllers/WishlistController");


wishlistRoutes.post("/add-to-wishlist", addToWishlist);

wishlistRoutes.get("/:userId", getWishlist);

wishlistRoutes.delete("/remove", removeFromWishlist);

wishlistRoutes.delete("/clear/:userId", clearWishlist);

// wishlistRoutes.get("/check/:userId/:productId");

module.exports = wishlistRoutes;