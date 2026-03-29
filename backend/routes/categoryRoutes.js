const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
} = require("../controllers/categoryController");

router.post("/", createCategory);
router.get("/", getCategories);


module.exports = router;