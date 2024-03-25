import express from "express";
import {getAllRecentChat, getInfoRecentChat} from "../controllers/recentChat-controllers.js";

export const router = express.Router();

router.get('/recents/:id', getAllRecentChat); // получаем все чаты пользователя
router.get('/recents/info/:id', getInfoRecentChat); // получаем всю инфу чата


