import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.userLogin);
router.put('/update', userController.userUpdatePassword);

export default router;

