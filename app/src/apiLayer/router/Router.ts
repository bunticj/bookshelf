import express from 'express';
import { apiRouter, freeRouter } from './ApiRoutes';
import { isAdmin, isAuthor } from '../middleware/Authentication';
import { adminRouter } from './AdminRoutes';

export const router = express.Router();

router.use('/free', freeRouter); // TODO remove later
router.use('/api', isAuthor, apiRouter);
router.use('/admin', isAdmin, adminRouter);