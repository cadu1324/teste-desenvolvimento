import express from 'express';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/test', auth.verify, async (_, res):Promise<any> => res.json({message: 'ok'}));

export default router;
