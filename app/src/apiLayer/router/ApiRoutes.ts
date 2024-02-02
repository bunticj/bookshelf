import express from 'express';
import { userController } from '../controller/UserController';
import { bookController } from '../controller/BookController';

export const apiRouter = express.Router();

// User routes
apiRouter.post('/register', userController.register);
apiRouter.post('/login', userController.login);
apiRouter.get('/user/:userId', userController.getById);
apiRouter.get('/user/:userId/deactivate', userController.deactivate);


// Book routes
apiRouter.post('/book', bookController.createBook);
apiRouter.get('/book/:bookId', bookController.getByBookId);
apiRouter.patch('/book/:bookId', bookController.updateBook);
apiRouter.delete('/book/:bookId', bookController.deleteBook);
