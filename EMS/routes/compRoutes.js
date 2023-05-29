import express from 'express';
import { compRegister } from '../controllers/compController.js';
const router = express.Router();

router.post('/register', compRegister);

export default router;
