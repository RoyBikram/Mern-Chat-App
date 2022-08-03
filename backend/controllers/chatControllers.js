const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

// TODO:Create new chat and give existing chat -> if api send request second time with out adding value to the latest massage it will give error
const accessChat = asyncHandler(async (req, res) => {
    // const userId = req.user._id
    const { receiverUserId } = req.body;

    if (!receiverUserId) {
        console.log('UserId param not sent with request');
        return res.status(400).send('User Is Not Authorized');
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: receiverUserId } } },
        ],
    })
        .populate('users', '-password')
        .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email',
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, receiverUserId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({
                _id: createdChat._id,
            }).populate('users', '-password');
            res.status(200).send(FullChat);
        } catch (error) {
            res.status().send(error.message);
            throw new Error(error.message);
        }
    }
});

const fetchChat = asyncHandler(async (req, res) => {
    try {
        var Chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } },
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });
        Chats = await User.populate(Chats, {
            path: 'latestMessage.sender',
            select: 'name pic email',
        });
        res.send(Chats);
    } catch (error) {}
});

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(401).send('Fill all the field');
    }
    const users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send('At least 3 member needed');
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.find({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        res.send(fullGroupChat);
    } catch (error) {
        res.status(400).send(error.message);
        throw new Error('error.message');
    }
});

const renameGroup = asyncHandler(async (req, res) => {
    if (!req.body.updatedChatName) {
        return res.status(400).send('Fill the updated group name');
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            req.body.chatId,
            { chatName: req.body.updatedChatName },
            { new: true }
        )
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        if (!updatedChat) {
            res.status(404);
            throw new Error('Chat Not Found');
        } else {
            res.send(updatedChat);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// TODO : check if the requester is admin
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },
            },
            {
                new: true,
            }
        )
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        if (!removed) {
            res.status(404);
            throw new Error('Chat Not Found');
        } else {
            res.json(removed);
        }
    } catch (error) {
        res.status(400).send(error.message);
        throw new Error(error.message);
    }
});

// TODO:check if the requester is admin
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },
            },
            {
                new: true,
            }
        )
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        if (!added) {
            res.status(404);
            throw new Error('Chat Not Found');
        } else {
            res.json(added);
        }
    } catch (error) {
        res.status(400).send(error.message);
        throw new Error(error.message);
    }
});

module.exports = {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup,
};
