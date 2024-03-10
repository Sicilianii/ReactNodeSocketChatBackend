const express = require('express');
const { join } = require('node:path');
const { getAllChats, getFullInfo } = require('../controllers/main-controllers');
const { getMessagesRecentChat, getMessagesGroupChat } = require('../controllers/messages-controllers')

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'index.html'));
});

router.get('/root', getFullInfo);

// router.get('/chats', getAllChats);

router.get('/chats/recent/:id', getMessagesRecentChat);

router.get('/chats/group/:id', getMessagesGroupChat);

module.exports = router;