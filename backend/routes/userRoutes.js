const express = require('express')
const { registerUser, authUser } = require('../controllers/userControllers')
const userRouters = express.Router()

userRouters.post('/',registerUser)
userRouters.post('/login', authUser)

module.exports = userRouters