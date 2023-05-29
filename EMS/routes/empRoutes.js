import express from 'express';
import { addEmp, viewEmp, viewOneEmp } from '../controllers/empController.js';
import verifyToken from '../middleware/validateToken.js';
const router = express.Router();

router.post('/add', addEmp);
router.get('/view', viewEmp);
router.get('/view/:empCode', viewOneEmp);

export default router;
