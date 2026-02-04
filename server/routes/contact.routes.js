const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
};

// Public route
router.post('/', validateContact, submitContact);

// Admin routes
router.get('/', protect, isAdmin, getAllContacts);

module.exports = router;