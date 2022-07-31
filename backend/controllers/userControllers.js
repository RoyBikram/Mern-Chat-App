const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Enter all the Feilds');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send('User already exists');
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('User Can Not Created');
    }
});
// TODO Implement a response for "User not exist" and "Password is not current"

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
      res.send(401)
      throw new Error('Invalid Email Or Password')
    }
});

const allUsers = asyncHandler(async (req, res) => { 
    const keyword = req.query.search
    const query = keyword ? {
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            {email:{$regex:keyword, $options:'i'}}
        ]
    } : {}
    console.log(keyword)
    const users = await User.find(query).find({ _id: { $ne: req.user._id } })
    res.send(users)
    // res.status(401).send('Not authorized, token failed');
// console.log(query)
 })

module.exports = { registerUser, authUser, allUsers };
