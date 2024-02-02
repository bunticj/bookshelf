import express from 'express';
import { userController } from '../controller/UserController';

export const adminRouter = express.Router();

// User account routes
adminRouter.post('/register', userController.register);
adminRouter.post('/login', userController.login);