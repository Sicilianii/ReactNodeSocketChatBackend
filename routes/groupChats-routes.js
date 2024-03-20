const express = require('express');
const { getAllGroupChats, getInfoGroupChat } = require('../controllers/groupChat-controllers');

const router = express.Router();

router.get('/groups/:id', getAllGroupChats)  // получаем все чаты пользователя
router.get('/groups/info/:id', getInfoGroupChat); // получаем всю инфу чата


module.exports = router;