const userRoutes = require("express").Router();
const { registerUser, loginUser, getUserDetail } = require("../controllers/UserController");
const { validateToken } = require("../middleware/AuthMiddleware");

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", validateToken, getUserDetail);

module.exports = userRoutes;
