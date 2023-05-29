import express from 'express';
import { login, userRegister } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', login);

export default router;
