import { Router } from 'express';

const router = Router();

router.get('/health', (_, res) => {console.log("online")});

export default router;
