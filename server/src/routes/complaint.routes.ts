import { Router } from 'express';
import { createComplaint, getComplaints, updateStatus } from '../controllers/complaint.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { Role } from '../models/User.js';

const router = Router();

// All authenticated users can create complaints and view their own list
router.use(authenticate);
router.post('/', createComplaint);
router.get('/', getComplaints);

// Admin can update complaint status
router.put('/:id/status', authorize([Role.Admin]), updateStatus);

export default router;
