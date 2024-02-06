import express from 'express';
import { accountController } from '../controller/AccountController';
import { userController } from '../controller/UserController';

export const adminRouter = express.Router();

// User routes
adminRouter.patch('/user/:userId', accountController.updateUser);
adminRouter.delete('/user/:userId', accountController.deleteUser);
adminRouter.get('/user', userController.getUsers);


