const express = require('express');
const {getAllRecentChat} = require("../controllers/recentChat-controllers");

const router = express.Router();

router.get('/recents/:id', getAllRecentChat); // получаем все чаты пользователя

module.exports = router;

