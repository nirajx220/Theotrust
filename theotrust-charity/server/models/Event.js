const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [10000, 'Long description cannot exceed 10000 characters'],
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: ['fundraiser', 'awareness', 'workshop', 'celebration', 'meeting', 'other'],
      default: 'fundraiser',
    },
    location: {
      venue: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
    virtualLink: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    registrationDeadline: {
      type: Date,
    },
    maxAttendees: {
      type: Number,
      min: [0, 'Max attendees cannot be negative'],
    },
    currentAttendees: {
      type: Number,
      default: 0,
      min: [0, 'Current attendees cannot be negative'],
    },
    image: {
      type: String,
      trim: true,
    },
    images: [{
      type: String,
      trim: true,
    }],
    registrationFee: {
      type: Number,
      default: 0,
      min: [0, 'Registration fee cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      enum: ['USD', 'GBP', 'EUR', 'CAD', 'AUD'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    registrationRequired: {
      type: Boolean,
      default: true,
    },
    organizer: {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
    speakers: [{
      name: {
        type: String,
        trim: true,
      },
      title: {
        type: String,
        trim: true,
      },
      bio: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
    }],
    agenda: [{
      time: {
        type: String,
        trim: true,
      },
      title: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      speaker: {
        type: String,
        trim: true,
      },
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    relatedProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
eventSchema.index({ slug: 1 });
eventSchema.index({ eventType: 1, isActive: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ isFeatured: 1, isActive: 1 });
eventSchema.index({ tags: 1 });

// Generate slug from title before validation
eventSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Validate end date is after start date
eventSchema.pre('save', function (next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

// Calculate if event is full
eventSchema.virtual('isFull').get(function () {
  if (!this.maxAttendees) return false;
  return this.currentAttendees >= this.maxAttendees;
});

// Calculate if event is past
eventSchema.virtual('isPast').get(function () {
  return new Date() > this.endDate;
});

// Calculate if event is upcoming
eventSchema.virtual('isUpcoming').get(function () {
  return new Date() < this.startDate;
});

// Calculate if event is ongoing
eventSchema.virtual('isOngoing').get(function () {
  const now = new Date();
  return now >= this.startDate && now <= this.endDate;
});

// Ensure virtuals are included when converting to JSON
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
