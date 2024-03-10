const express = require('express');
const { getAllGroupChats } = require('../controllers/groupChat-controllers');

const router = express.Router();

router.get('/groups', getAllGroupChats)  // получаем все чаты пользователя

module.exports = router;