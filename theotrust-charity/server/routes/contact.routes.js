const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getAllContacts, 
  getContact, 
  updateContactStatus, 
  deleteContact 
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', validateContact, submitContact);

// Admin routes
router.get('/', protect, authorize('admin'), getAllContacts);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;