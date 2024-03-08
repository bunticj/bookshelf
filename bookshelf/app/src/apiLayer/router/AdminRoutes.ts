import express from 'express';
import { accountController } from '../controller/AccountController';
import { userController } from '../controller/UserController';

export const adminRouter = express.Router();

/* eslint-disable @typescript-eslint/no-misused-promises */

adminRouter.patch('/user/:userId', accountController.updateUser);
adminRouter.delete('/user/:userId', accountController.deleteUser);
adminRouter.get('/user', userController.getUsers);

/* eslint-enable @typescript-eslint/no-misused-promises */

