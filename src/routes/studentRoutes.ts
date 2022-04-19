import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from '../controllers/studentController';
import { methodNotAllowed } from '../middleware/errorMiddleware';

const router = express.Router();

router
  .route('/alumnos/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent)
  .all(methodNotAllowed);
router
  .route('/alumnos')
  .get(getStudents)
  .post(createStudent)
  .all(methodNotAllowed);

export { router as studentsRoutes };
