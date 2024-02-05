import express from 'express';
import { userController } from '../controller/UserController';
import { bookController } from '../controller/BookController';
import { accountController } from '../controller/AccountController';

export const adminRouter = express.Router();

// User routes
adminRouter.post('/login', userController.login);

adminRouter.get('/user/:userId/deactivate', accountController.deactivate);
adminRouter.get('/user/:userId/books', bookController.getAuthorBooks);
adminRouter.post('/user/:userId/password', accountController.changePassword);
adminRouter.get('/user/:userId', userController.getById);
adminRouter.patch('/user/:userId', accountController.updateUser);
adminRouter.delete('/user/:userId', accountController.deleteUser);

// Book routes
adminRouter.post('/book', bookController.createBook);
adminRouter.get('/book/:bookId', bookController.getByBookId);
adminRouter.patch('/book/:bookId', bookController.updateBook);
adminRouter.delete('/book/:bookId', bookController.deleteBook);
