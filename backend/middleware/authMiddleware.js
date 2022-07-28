const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // let value = req.body.token || req.query.token || req.headers["x-access-token"];
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedData.id).select('-password');
            next();
        } catch (error) {
            res.status(401).send('Not authorized, token failed');
        }
    }
});

module.exports = {protect}
