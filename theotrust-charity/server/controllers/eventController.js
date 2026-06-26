const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, eventType, isPast, isFeatured } = req.query;

    // Build query
    const query = { isActive: true, isPublished: true };
    
    if (eventType) {
      query.eventType = eventType;
    }
    
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    // Filter by past/upcoming events
    if (isPast !== undefined) {
      const now = new Date();
      if (isPast === 'true') {
        query.endDate = { $lt: now };
      } else {
        query.startDate = { $gte: now };
      }
    }

    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('relatedProgram', 'name slug')
      .select('-__v');

    const count = await Event.countDocuments(query);

    res.json({
      success: true,
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
    });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isActive: true,
      isPublished: true,
    }).populate('relatedProgram', 'name slug description');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
    });
  }
};

// Create event (admin)
exports.createEvent = async (req, res) => {
  try {
    const allowedFields = [
      'title', 'slug', 'description', 'longDescription', 'eventType',
      'location', 'isVirtual', 'virtualLink', 'startDate', 'endDate',
      'registrationDeadline', 'maxAttendees', 'image', 'images',
      'registrationFee', 'currency', 'isFeatured', 'isPublished',
      'registrationRequired', 'organizer', 'speakers', 'agenda',
      'tags', 'relatedProgram'
    ];

    const eventData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        eventData[field] = req.body[field];
      }
    });

    // Add creator
    if (req.user) {
      eventData.createdBy = req.user.id;
    }

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create event',
    });
  }
};

// Update event (admin)
exports.updateEvent = async (req, res) => {
  try {
    const allowedFields = [
      'title', 'slug', 'description', 'longDescription', 'eventType',
      'location', 'isVirtual', 'virtualLink', 'startDate', 'endDate',
      'registrationDeadline', 'maxAttendees', 'currentAttendees',
      'image', 'images', 'registrationFee', 'currency', 'isActive',
      'isFeatured', 'isPublished', 'registrationRequired', 'organizer',
      'speakers', 'agenda', 'tags', 'relatedProgram'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Add updater
    if (req.user) {
      updateData.updatedBy = req.user.id;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
    });
  }
};

// Delete event (admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
    });
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const events = await Event.find({
      isActive: true,
      isPublished: true,
      startDate: { $gte: new Date() },
    })
      .sort({ startDate: 1 })
      .limit(limit)
      .select('title slug description startDate endDate location eventType image isFeatured');

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events',
    });
  }
};

// Register for event (if registration required)
exports.registerForEvent = async (req, res) => {
  try {
    const { name, email, phone, attendees = 1 } = req.body;
    const eventId = req.params.id;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Get event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if event is active and published
    if (!event.isActive || !event.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Event is not available for registration',
      });
    }

    // Check if registration is required
    if (!event.registrationRequired) {
      return res.status(400).json({
        success: false,
        message: 'This event does not require registration',
      });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed',
      });
    }

    // Check if event is full
    if (event.maxAttendees && event.currentAttendees + attendees > event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Event is full',
      });
    }

    // Update attendee count
    event.currentAttendees += attendees;
    await event.save();

    // TODO: Store registration details in a separate Registration model
    // TODO: Send confirmation email

    res.json({
      success: true,
      message: 'Successfully registered for the event',
      event: {
        id: event._id,
        title: event.title,
        startDate: event.startDate,
      },
    });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register for event',
    });
  }
};
