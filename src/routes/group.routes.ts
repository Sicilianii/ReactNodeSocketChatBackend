import { Router } from "express";
import { getAllGroupChats, getInfoGroupChat, createNewChat } from '../controllers/group.controller';
import {getMessagesGroupChat} from "../controllers/messages.controller";


class GroupRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get('/groups/:id', getAllGroupChats)  // получаем все чаты пользователя
        this.router.get('/groups/info/:id', getInfoGroupChat); // получаем всю инфу чата
        this.router.post('/group/new', createNewChat);
        this.router.get('/chats/group/:id', getMessagesGroupChat);

    }
}

export default new GroupRoutes().router;