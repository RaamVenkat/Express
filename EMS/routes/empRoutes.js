import express from 'express';
import { addEmp, viewEmp } from '../controllers/empController.js';
import verifyToken from '../middleware/validateToken.js';
const router = express.Router();

router.post('/add', verifyToken, addEmp);
router.get('/view', verifyToken, viewEmp);

export default router;
