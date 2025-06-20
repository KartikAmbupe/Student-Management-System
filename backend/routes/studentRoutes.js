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

router.get('/api/students', authorize('admin', 'user'), getStudents);
router.post('/api/students', authorize('admin'), addStudent);
router.delete('/api/students/:id', authorize('admin'), deleteStudent);
router.put('/api/students/:id', authorize('admin'), updateStudent);

export default router;
