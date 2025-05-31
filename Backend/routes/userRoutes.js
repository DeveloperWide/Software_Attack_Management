const express = require("express");
const router = express.Router();
const User = require("../models/User.js")
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
     console.log(`Body Data`, req.body)
    try {
        let newUser = new User(req.body)

        let svdUser = await newUser.save()
        return res.status(200).json({
            success: true,
            message: "successfully Received",
            data: svdUser
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({email: req.body.email})
        let isValid = await bcrypt.compare(req.body.password, user.password);
        console.log(isValid)
        res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error Occurred"
        })
    }
})

module.exports = router;