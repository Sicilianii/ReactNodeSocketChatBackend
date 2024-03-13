const express = require('express');
const { getAllGroupChats } = require('../controllers/groupChat-controllers');

const router = express.Router();

router.get('/groups/:id', getAllGroupChats)  // получаем все чаты пользователя

module.exports = router;