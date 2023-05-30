import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/dbConnection.js';
// import { empData } from './data/emp.js';
// import Employee from './models/empModel.js';
import empData from './public/data.js';
import compRoutes from './routes/compRoutes.js';
import empRoutes from './routes/empRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDb();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/comp', compRoutes);
app.use('/user', userRoutes);
app.use('/emp', empRoutes);
app.post('/data', empData);

const port = process.env.PORT;

// Employee.insertMany(empData);
app.listen(port, () => console.log(`Server Port: ${port}`));
