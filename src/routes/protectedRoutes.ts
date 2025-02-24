import express from 'express';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/profile', auth.verify, () => {});

export default router;

