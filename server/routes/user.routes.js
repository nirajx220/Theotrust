const express = require('express');
const router = express.Router();

// Get all users (admin)
router.get('/', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      users: [] 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;
