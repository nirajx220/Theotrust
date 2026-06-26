const Program = require('../models/Program');

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true }).sort({ order: 1 });

    res.json({
      success: true,
      programs,
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch programs',
    });
  }
};

// Get single program
exports.getProgram = async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID',
      });
    }

    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      program,
    });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch program',
    });
  }
};

// Create program (admin)
exports.createProgram = async (req, res) => {
  try {
    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = [
      'name', 'slug', 'description', 'longDescription', 'category',
      'location', 'targetAmount', 'currentAmount', 'beneficiaries',
      'image', 'images', 'isFeatured', 'startDate', 'endDate', 'impact'
    ];
    
    const programData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        programData[field] = req.body[field];
      }
    });

    const program = await Program.create(programData);

    res.status(201).json({
      success: true,
      program,
    });
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create program',
    });
  }
};

// Update program (admin)
exports.updateProgram = async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID',
      });
    }

    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = [
      'name', 'slug', 'description', 'longDescription', 'category',
      'location', 'targetAmount', 'currentAmount', 'beneficiaries',
      'image', 'images', 'isActive', 'isFeatured', 'order',
      'startDate', 'endDate', 'impact'
    ];
    
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      program,
    });
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update program',
    });
  }
};

// Delete program (admin)
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found',
      });
    }

    res.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete program',
    });
  }
};