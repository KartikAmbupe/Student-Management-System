import express from 'express';
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('admin', 'user'), getStudents);
router.post('/', authorize('admin'), addStudent);
router.put('/:id', authorize('admin'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

export default router;
