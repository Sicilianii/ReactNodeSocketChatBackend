import { Router } from "express";
import {
    getAllUsers,
    singIn,
    singUp,
    getProfileInfoByID,
    changeProfileName,
    changeProfileJobTitle,
    subscription,
    searchNewFriends,
    squabble,
    befriend
} from '../controllers/profile.controller';


class ProfileRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.get('/user/:id', getAllUsers );
        this.router.post('/singIn', singIn );
        this.router.post('/singUp', singUp);
        this.router.get('/profile/:id', getProfileInfoByID);
        this.router.post('/profile/:id/newName', changeProfileName);
        this.router.post('/profile/:id/newTitle', changeProfileJobTitle);
        this.router.get('/profile/:id/subscription', subscription);
        this.router.post('/profile/:id/search', searchNewFriends);
        this.router.get('/profile/:myID/squabble/:idFriend', squabble);
        this.router.get('/profile/:myID/befriend/:idFriend', befriend);
    }
}

export default new ProfileRoutes().router;