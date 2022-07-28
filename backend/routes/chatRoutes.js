const express = require('express');
const { accessChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatControllers');
const { protect } = require('../middleware/authMiddleware');
const chatRouters = express.Router();

chatRouters.post('/', [protect, accessChat]);
chatRouters.get('/', [protect, fetchChat]);
chatRouters.post('/group', [protect, createGroupChat]);
chatRouters.put('/rename', [protect, renameGroup]);
chatRouters.put('/groupremove', [protect, removeFromGroup]);
chatRouters.put('/groupadd', [protect, addToGroup]);

module.exports = chatRouters