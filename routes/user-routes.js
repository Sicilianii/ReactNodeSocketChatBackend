import express from "express";
import {
    getAllUsers,
    singIn,
    singUp,
    getProfileInfoByID,
    changeProfileName,
    changeProfileJobTitle,
    subscription,
    searchNewFriends
} from '../controllers/user-controllers.js';

export const router = express.Router();

router.get('/user/:id', getAllUsers );
router.post('/singIn', singIn );
router.post('/singUp', singUp);
router.get('/profile/:id', getProfileInfoByID);
router.post('/profile/:id/newName', changeProfileName);
router.post('/profile/:id/newTitle', changeProfileJobTitle);
router.get('/profile/:id/subscription', subscription);
router.post('/profile/:id/search', searchNewFriends);