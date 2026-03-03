const express = require('express');
const router = express.Router();
const {
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllPrograms);
router.get('/:id', getProgram);

// Protected routes (admin)
router.post('/', protect, authorize('admin'), createProgram);
router.put('/:id', protect, authorize('admin'), updateProgram);
router.delete('/:id', protect, authorize('admin'), deleteProgram);

module.exports = router;