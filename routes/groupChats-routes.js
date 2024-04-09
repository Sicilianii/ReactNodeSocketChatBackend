import express from "express";
import { getAllGroupChats, getInfoGroupChat, createNewChat } from '../controllers/groupChat-controllers.js';

export const router = express.Router();

router.get('/groups/:id', getAllGroupChats)  // получаем все чаты пользователя
router.get('/groups/info/:id', getInfoGroupChat); // получаем всю инфу чата
router.post('/group/new', createNewChat);
