const express = require('express')
const { registerUser, authUser, allUsers } = require('../controllers/userControllers')
const userRouters = express.Router()
const {protect} = require('../middleware/authMiddleware')

userRouters.post('/', registerUser)
userRouters.get('/',[protect, allUsers]);

userRouters.post('/login', authUser)
 
module.exports = userRouters