import express from 'express';
import { userAccountController } from '../controller/UserAccountController';

export const apiRouter = express.Router();

// User account routes
apiRouter.post('/register', userAccountController.register);
apiRouter.post('/login', userAccountController.login);
apiRouter.get('/user/:userId', userAccountController.getById);
