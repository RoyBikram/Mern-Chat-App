const expressAsyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log('Invalid data passes into request');
        return res.status(400).send('Please fill all required field');
    }
    // console.log(req.user)
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };
    try {
        var message = await Message.create(newMessage);
        message = await message.populate('sender', '-password');
        message = await message.populate('chat', 'users');
        
        message = await User.populate(message, {
            path: 'chat.users',
            select: '-password',
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        res.status(400).send(error.message);
        throw new Error(error.message);
    }
});
const getAllMessages = expressAsyncHandler(async (req, res) => { 
    try {
        var message = await Message.find({ chat: req.params.chatId }).populate('sender', '-password').populate('chat')

        res.json(message)
    } catch (error) {
        res.status(400).send(error.message)
        throw new Error(error.message)
    }
 })

module.exports = { sendMessage,getAllMessages };
