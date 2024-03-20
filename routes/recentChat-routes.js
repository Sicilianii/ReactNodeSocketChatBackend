const express = require('express');
const {getAllRecentChat, getInfoRecentChat} = require("../controllers/recentChat-controllers");

const router = express.Router();

router.get('/recents/:id', getAllRecentChat); // получаем все чаты пользователя
router.get('/recents/info/:id', getInfoRecentChat); // получаем всю инфу чата

module.exports = router;

