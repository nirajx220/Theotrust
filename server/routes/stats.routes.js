const express = require('express');
const router = express.Router();

// Get donation statistics
router.get('/', async (req, res) => {
  try {
    const stats = {
      totalDonations: 0,
      totalAmount: 0,
      activeDonors: 0,
      activePrograms: 0
    };
    
    res.json({ 
      success: true, 
      stats 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

module.exports = router;