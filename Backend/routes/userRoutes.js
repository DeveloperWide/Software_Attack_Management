const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {

  try {
    let { email } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email Already Exist"
      })
    }
    let newUser = new User(req.body);
    let svdUser = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Successfully registered",
      data: {
        _id: svdUser._id,
        name: svdUser.name,
        email: svdUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error Occurred",
    });
  }
});

module.exports = router;