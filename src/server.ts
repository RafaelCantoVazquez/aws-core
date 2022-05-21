import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { studentsRoutes } from './routes/studentRoutes';
import { teachersRoutes } from './routes/teacherRoutes';
import { sequelize, testConnection } from './config/db';

dotenv.config();
testConnection();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(studentsRoutes);
app.use(teachersRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
