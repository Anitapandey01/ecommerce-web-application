const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    const order = await Order.create({
      user,
      products,
      totalPrice,
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};