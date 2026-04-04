const User = require("../models/UserModel");
const Seller = require("../models/SellerModel");
const Order = require("../models/OrderModel");
const Category = require("../models/CategoryModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["customer", "seller"] } }).select("-password -resetPasswordOTP");
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Toggle block status
    user.status = user.status === "blocked" ? "active" : "blocked";
    await user.save();

    res.status(200).json({ success: true, message: `User status changed to ${user.status}`, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user status", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // If user is a seller, delete seller profile too
    if (user.role === "seller") {
      await Seller.findOneAndDelete({ userId: user._id });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
  }
};

// ========================
// SELLER MANAGEMENT
// ========================

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate("userId", "name email status");
    res.status(200).json({ success: true, count: sellers.length, data: sellers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching sellers", error: error.message });
  }
};

exports.approveSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

    seller.status = "approved";
    seller.isVerified = true;
    await seller.save();

    res.status(200).json({ success: true, message: "Seller approved", data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error approving seller", error: error.message });
  }
};

exports.rejectSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

    seller.status = "rejected";
    seller.isVerified = false;
    await seller.save();

    res.status(200).json({ success: true, message: "Seller rejected", data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error rejecting seller", error: error.message });
  }
};

exports.suspendSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

    seller.status = seller.status === "suspended" ? "approved" : "suspended";
    await seller.save();

    res.status(200).json({ success: true, message: `Seller status changed to ${seller.status}`, data: seller });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error suspending seller", error: error.message });
  }
};

// ========================
// DASHBOARD STATS
// ========================

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue from orders that aren't cancelled
    const orders = await Order.find({ orderStatus: { $ne: "Cancelled" } });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSellers,
        totalOrders,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dashboard stats", error: error.message });
  }
};

// ========================
// CATEGORY MANAGEMENT
// ========================

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parentCategoryId", "name");
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategoryId, level } = req.body;
    
    if (!name || level === undefined) {
      return res.status(400).json({ success: false, message: "Name and level are required" });
    }

    const newCategory = await Category.create({
      name,
      parentCategoryId: parentCategoryId || null,
      level
    });

    res.status(201).json({ success: true, message: "Category created", data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating category", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating category", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting category", error: error.message });
  }
};
