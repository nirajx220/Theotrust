const express = require('express');
const router = express.Router();
const {
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllPrograms);
router.get('/:id', getProgram);

// Protected routes (admin)
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;