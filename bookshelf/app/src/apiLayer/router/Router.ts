import express from 'express';
import { apiRouter } from './ApiRoutes';
import { isAdmin, isAuthor } from '../middleware/Authentication';
import { adminRouter } from './AdminRoutes';

export const router = express.Router();

/* eslint-disable @typescript-eslint/no-misused-promises */
router.use('/api', isAuthor, apiRouter);
router.use('/admin', isAdmin, adminRouter);
/* eslint-enable @typescript-eslint/no-misused-promises */
