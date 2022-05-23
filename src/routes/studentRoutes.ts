import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
  uploadProfilePicture,
} from '../controllers/studentController';
import { methodNotAllowed } from '../middleware/errorMiddleware';
import { upload } from '../utils/profilePicture';

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
router.route('/alumnos/:id/fotoPerfil').post(uploadProfilePicture);

export { router as studentsRoutes };
