const User = require("../models/UserModel");
const Seller = require("../models/SellerModel");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      shopName,
      businessEmail,
      gstNumber,
      address,
      city,
      state,
      pincode,
      isVerified,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "User is already registered",
      });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: encryptedPass,
      role: role || "customer",
    });

    if (role === "seller") {
      const createSeller = await Seller.create({
        userId: createdUser._id,
        shopName,
        address,
        city,
        state,
        pincode,
        gstNumber,
        businessEmail,
      });
    }

    res.status(201).json({
      message: "registered successfully",
      data: createdUser,
      role: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while registering user",
      error: error,
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
      return res.status(200).json({
        success: true,
        message: "login Sucessfully",
        data: foundUser,
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
