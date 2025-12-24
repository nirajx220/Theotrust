const express = require('express');
const router = express.Router();

// Get all programs
router.get('/', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      programs: [] 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get single program
router.get('/:id', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      program: {} 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;