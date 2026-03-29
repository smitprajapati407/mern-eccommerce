const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// ✅ Save Order
router.post("/create", async (req, res) => {
  try {
    const { userId, items, total, address, paymentId } = req.body;

    const order = new Order({
      user: userId,
      items,
      total,
      address,
      paymentId,
    });

    await order.save();

    res.json({ message: "Order saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get user orders
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ user: req.params.userId });
  res.json(orders);
});

module.exports = router;