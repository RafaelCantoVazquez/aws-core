import express from 'express';
import {
  createTeacher,
  deleteTeacher,
  getTeacherById,
  getTeachers,
  updateTeacher,
} from '../controllers/teacherController';
import { methodNotAllowed } from '../middleware/errorMiddleware';

const router = express.Router();

router
  .route('/profesores/:id')
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher)
  .all(methodNotAllowed);
router
  .route('/profesores')
  .get(getTeachers)
  .post(createTeacher)
  .all(methodNotAllowed);

export { router as teachersRoutes };
