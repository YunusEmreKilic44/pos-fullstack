const User = require("../models/User.js");
const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

//! register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json("A new User created successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
