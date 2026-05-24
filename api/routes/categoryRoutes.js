const Category = require("../models/Category.js");
const express = require("express");

const router = express.Router();

//! get all category
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

//!create
router.post("/add-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    return res.status(200).json("Item added successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//!Update
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body, {
      new: true,
    });
    return res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//!delete
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    return res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
