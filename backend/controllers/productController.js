const Product = require("../models/Product");

// 🔹 CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,        // category ID
      user: req.user,  // from middleware
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name") // 🔥 show category name
      .populate("user", "name");

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET PRODUCTS BY CATEGORY
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.id,
    }).populate("category", "name");

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};