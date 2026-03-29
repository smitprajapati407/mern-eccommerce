const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET PRODUCTS
router.get("/", async (req, res) => {
  const { category } = req.query;

  let products;

  if (category) {
    products = await Product.find({ category }).populate("category");
  } else {
    products = await Product.find().populate("category");
  }

  res.json(products);
});

module.exports = router;