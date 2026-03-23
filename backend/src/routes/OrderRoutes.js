const orderRoutes = require("express").Router();

const {
  validateToken,
  isSeller,
  isCustomer,
} = require("../middleware/AuthMiddleware");

const {
  placeOrder,
  getUserOrders,
  getSellerOrders,
  updateOrderStatus,
} = require("../controllers/OrderController");

// ORDER
orderRoutes.post("/place", validateToken, isCustomer, placeOrder);
orderRoutes.get("/my-orders", validateToken, isCustomer, getUserOrders);
orderRoutes.get("/seller-orders", validateToken, isSeller, getSellerOrders);
orderRoutes.put("/status", validateToken, isSeller, updateOrderStatus);

module.exports = orderRoutes;
