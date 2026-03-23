const Order = require("../models/OrderModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Group items by seller
    const sellerMap = {}; // { sellerId: { items: [], totalAmount: 0 } }

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      const sellerId = product.sellerId.toString(); //18 char

      // create seller bucket if not exist
      if (!sellerMap[sellerId]) {
        sellerMap[sellerId] = {
          items: [],
          totalAmount: 0,
        };
      }

      // push item
      sellerMap[sellerId].items.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });

      sellerMap[sellerId].totalAmount += item.price * item.quantity;
    }

    // 📦 Create orders for each seller
    const orders = [];

    for (const sellerId in sellerMap) {
      const order = await Order.create({
        userId,
        sellerId,
        addressId,
        items: sellerMap[sellerId].items,
        totalAmount: sellerMap[sellerId].totalAmount,
      });

      orders.push(order);
    }

    // 🧹 Clear cart
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      success: true,
      message: "Orders placed successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.productId")
      .populate("addressId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data:orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({ sellerId })
      .populate("items.productId")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      data:orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data:order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};