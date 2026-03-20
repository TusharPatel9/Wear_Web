const userRoutes = require("express").Router();
const { registerUser, loginUser } = require("../controllers/UserController");

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
// userRoutes.get("/profile");

module.exports = userRoutes;
