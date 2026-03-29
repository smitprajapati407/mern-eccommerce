const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_RzRyHj14kPmIAb",
  key_secret: "KibZMl4ucLVGCwuh8jBl4rBp",
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  console.log("Creating order with amount:", amount);

  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;