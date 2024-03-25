import express from "express";
import { getAllUsers } from '../controllers/user-controllers.js';

export const router = express.Router();
router.get('/user/:id', getAllUsers );