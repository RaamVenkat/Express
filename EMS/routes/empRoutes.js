import express from 'express';
import { addEmp, viewEmp } from '../controllers/empController.js';
import verifyToken from '../middleware/validateToken.js';
const router = express.Router();

router.post('/add', addEmp);
router.get('/view', viewEmp);

export default router;
