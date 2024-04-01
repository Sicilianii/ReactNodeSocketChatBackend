import express from "express";
import { getAllUsers, singIn, registration } from '../controllers/user-controllers.js';

export const router = express.Router();
router.get('/user/:id', getAllUsers );
router.get('/singIn', singIn );
router.post('/register', registration)