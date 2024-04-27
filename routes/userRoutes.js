const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.get("/users", async (req, res)=> {
    try {
        const users = await User.find();
        res.status(201).json({
            status: true,
            users
        });
    } catch (error){
        console.log(error);
        res.status(401).json({
            status: false,
            message: error.message
        });
    }
});

router.get("/users/:id", async (req, res)=> {
    try {
        const userID = req.params.id;
        const user = await User.findById(userID);
        const { password, ...other } = user.toObject();
        res.status(201).json({
            status: true,
            user: other
        });
    } catch (error){
        console.log(error);
        res.status(401).json({
            status: false,
            message: error.message
        });
    }
});


router.delete("/users/:id", async (req, res)=> {
    try {
        const userID = req.params.id;
        const user = await User.findOneAndDelete(userID);
        res.status(201).json({
            status: true,
            message: "User deleted."
        });
    } catch (error){
        console.log(error);
        res.status(401).json({
            status: false,
            message: error.message
        });
    }
});

router.put("/users/:id", async (req, res)=> {
    try {
        const userID = req.params.id;
        console.log(req.body);
        if(req.body?.password){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(userID,
            { ...req.body },
            { new: true }
        );
        res.status(201).json({
            status: true,
            message: "updated",
            user
        });
    } catch (error){
        console.log(error);
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});


module.exports = router;