import express from 'express';
import { userController } from '../controller/UserController';
import { bookController } from '../controller/BookController';
import { accountController } from '../controller/AccountController';

export const apiRouter = express.Router();

/* eslint-disable @typescript-eslint/no-misused-promises */
// User account routes
apiRouter.post('/register', userController.register);
apiRouter.post('/login', userController.login);
apiRouter.post('/auth/refresh-token', accountController.refreshToken);

apiRouter.get('/user/:userId/deactivate', accountController.deactivate);
apiRouter.get('/user/:userId/books', bookController.getAuthorBooks);
apiRouter.get('/user/:userId', userController.getById);
apiRouter.post('/user/:userId/password', accountController.changePassword);

// Book routes
apiRouter.post('/book', bookController.createBook);
apiRouter.get('/book/:bookId', bookController.getByBookId);
apiRouter.patch('/book/:bookId', bookController.updateBook);
apiRouter.delete('/book/:bookId', bookController.deleteBook);
/* eslint-enable @typescript-eslint/no-misused-promises */

