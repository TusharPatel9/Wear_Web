const User = require("../models/UserModel");
const Seller = require("../models/SellerModel");
const bcrypt = require("bcrypt");
const { mailSend } = require("../utils/MailSend");
const Address = require("../models/AddressModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      shopName,
      businessEmail,
      gstNumber,
      area,
      city,
      state,
      pincode,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User is already registered",
      });
    }

    const userRole = role || "customer";

    if (userRole === "seller") {
      if (!shopName || !businessEmail || !gstNumber || !area || !city || !state || !pincode) {
        return res.status(400).json({
          message: "All seller fields are required",
        });
      }
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: encryptedPass,
      role: userRole,
    });

    if (userRole === "seller") {
      await Seller.create({
        userId: createdUser._id,
        shopName,
        gstNumber,
        businessEmail,
      });

      await Address.create({
        userId: createdUser._id,
        area,
        city,
        state,
        pincode,
      });
    }

    try {
      await mailSend(createdUser.email, "Welcome", "Registration Successful");
    } catch (err) {
      console.log("Mail error:", err);
    }

    const userResponse = createdUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Registered successfully",
      data: userResponse,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error while registering user",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({
        message: "User is Not registered",
      });
    }

    const isMatched = await bcrypt.compare(password, foundUser.password);

    if (isMatched) {
      const token = jwt.sign(foundUser.toObject(), process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        success: true,
        message: "login Sucessfully",
        token: token,
        role: foundUser.role,
      });
    } else {
      //401 Unauthorized
      //404 Not Found
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Error While Login",
    });
  }
};
