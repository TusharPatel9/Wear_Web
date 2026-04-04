const paymentRoutes = require("express").Router();

const { validateToken, isCustomer } = require("../middleware/AuthMiddleware");
const { createRazorpayOrder, verifyPayment } = require("../controllers/PaymentController");

paymentRoutes.get("/create-order", validateToken, isCustomer, createRazorpayOrder);
paymentRoutes.post("/verify", validateToken, isCustomer, verifyPayment);

module.exports = paymentRoutes;
