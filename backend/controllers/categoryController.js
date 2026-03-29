const Category = require("../models/Category");

// 🔹 CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    // check if already exists
    const existing = await Category.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      image,
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 GET SINGLE CATEGORY
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};