const reviewRoutes = require("express").Router();

const { addReview,deleteReview, getProductReviews } = require("../controllers/ReviewController");
const {validateToken,isCustomer,isAdmin,isSeller} = require("../middleware/AuthMiddleware");
const upload = require("../middleware/FileUpload");

reviewRoutes.post("/add", validateToken,isCustomer,upload.array("images", 5), addReview);
reviewRoutes.get("/reviews", validateToken, getProductReviews);
reviewRoutes.delete("/delete/:id", validateToken,isCustomer,isAdmin, deleteReview);
module.exports = reviewRoutes;
