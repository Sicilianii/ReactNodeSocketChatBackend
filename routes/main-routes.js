import express from "express";
import { join } from "node:path"
import { getFullInfo } from '../controllers/main-controllers.js';
import { getMessagesRecentChat, getMessagesGroupChat } from '../controllers/messages-controllers.js';

export const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(join(__dirname, '..', 'index.html'));
    res.json({
        message: 'Vse okey'
    });
});

router.get('/root', getFullInfo);
// // router.get('/chats', getAllChats);
router.get('/chats/recent/:id', getMessagesRecentChat);
router.get('/chats/group/:id', getMessagesGroupChat);