import { Router } from "express";
import {getAllRecentChat} from "../controllers/recent.controller";
import {getMessagesRecentChat} from "../controllers/messages.controller";

class RecentRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get('/recents/:id', getAllRecentChat);
        this.router.get('/chats/recent/:id', getMessagesRecentChat);

    }
}

export default new RecentRoutes().router;