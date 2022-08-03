const express = require('express')
const { sendMessage, getAllMessages } = require('../controllers/messageControllers')
const { protect } = require('../middleware/authMiddleware')
const messageRouters = express.Router()

messageRouters.post('/', [protect, sendMessage])
messageRouters.get('/:chatId', getAllMessages)

module.exports = messageRouters