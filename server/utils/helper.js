// server/utils/helpers.js
import crypto from 'crypto';

/**
 * Generate a unique reference ID for donations
 * Format: DON-YYYYMMDD-XXXXX
 */
export const generateDonationReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  return `DON-${year}${month}${day}-${random}`;
};

/**
 * Generate a unique reference ID for contacts
 * Format: CNT-YYYYMMDD-XXXXX
 */
export const generateContactReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  return `CNT-${year}${month}${day}-${random}`;
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount, currency = 'GBP') => {
  const symbols = {
    GBP: '£',
    USD: '$',
    EUR: '€'
  };
  
  return `${symbols[currency] || '£'}${amount.toFixed(2)}`;
};

/**
 * Calculate donation impact message
 */
export const getImpactMessage = (amount) => {
  if (amount >= 1000) {
    return {
      title: 'Teacher Training Program',
      description: 'Your generous donation will support teacher training programs for 10 educators, helping them deliver quality education to hundreds of children.',
      icon: '👩‍🏫'
    };
  } else if (amount >= 500) {
    return {
      title: 'Complete Classroom Setup',
      description: 'Your donation will fund a complete classroom setup with furniture and essential learning materials for an entire class.',
      icon: '🏫'
    };
  } else if (amount >= 250) {
    return {
      title: 'Classroom Learning Materials',
      description: 'Your contribution will provide essential learning materials for an entire classroom of students.',
      icon: '📚'
    };
  } else if (amount >= 100) {
    return {
      title: '3-Month Child Sponsorship',
      description: "Your donation will sponsor one child's education for three months, including books, supplies, and tutoring.",
      icon: '🎓'
    };
  } else if (amount >= 50) {
    return {
      title: 'Weekly Tutoring Support',
      description: 'Your support will fund a week of after-school tutoring for 5 children.',
      icon: '✏️'
    };
  } else {
    return {
      title: 'Monthly School Supplies',
      description: 'Your donation will provide school supplies for one child for a month, helping them stay engaged in their education.',
      icon: '📝'
    };
  }
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (UK format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
  return phoneRegex.test(phone);
};

/**
 * Calculate pagination metadata
 */
export const getPaginationMetadata = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    total,
    totalPages,
    currentPage: page,
    perPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

/**
 * Generate random secure token
 */
export const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Hash sensitive data
 */
export const hashData = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Format date for display
 */
export const formatDate = (date, format = 'long') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-GB');
  } else if (format === 'long') {
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } else if (format === 'datetime') {
    return d.toLocaleString('en-GB');
  }
  
  return d.toISOString();
};

/**
 * Calculate days until date
 */
export const daysUntil = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if date is in the past
 */
export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

/**
 * Generate slug from string
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get program name from ID
 */
export const getProgramName = (programId) => {
  const programs = {
    'where-needed': 'Where Most Needed',
    'ukraine': 'Ukraine Assistance',
    'uk-youngsters': 'UK Youngsters',
    'overseas': 'Overseas Youngsters'
  };
  
  return programs[programId] || 'General Fund';
};

/**
 * Get donation type label
 */
export const getDonationTypeLabel = (type) => {
  return type === 'monthly' ? 'Monthly Recurring' : 'One-Time';
};

/**
 * Validate donation amount
 */
export const isValidDonationAmount = (amount) => {
  return typeof amount === 'number' && amount >= 1 && amount <= 100000;
};

/**
 * Get tax deductible amount (UK Gift Aid)
 */
export const calculateGiftAid = (amount) => {
  // UK Gift Aid adds 25% to donation at no extra cost to donor
  return amount * 0.25;
};

/**
 * Check if string contains profanity (basic check)
 */
export const containsProfanity = (text) => {
  const profanityList = ['spam', 'scam']; // Add more as needed
  const lowerText = text.toLowerCase();
  return profanityList.some(word => lowerText.includes(word));
};

/**
 * Get IP address from request
 */
export const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress;
};

/**
 * Sleep/delay function
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }
};

/**
 * Convert object to query string
 */
export const objectToQueryString = (obj) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate CSV from array of objects
 */
export const generateCSV = (data, fields) => {
  if (!data || data.length === 0) return '';
  
  const header = fields.join(',');
  const rows = data.map(item => 
    fields.map(field => {
      const value = item[field] || '';
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',')
  );
  
  return [header, ...rows].join('\n');
};

/**
 * Parse CSV string
 */
export const parseCSV = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
      return obj;
    }, {});
  });
};

export default {
  generateDonationReference,
  generateContactReference,
  formatCurrency,
  getImpactMessage,
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  getPaginationMetadata,
  generateSecureToken,
  hashData,
  formatDate,
  daysUntil,
  isPastDate,
  generateSlug,
  calculatePercentage,
  truncateText,
  getProgramName,
  getDonationTypeLabel,
  isValidDonationAmount,
  calculateGiftAid,
  containsProfanity,
  getClientIp,
  sleep,
  retryWithBackoff,
  objectToQueryString,
  deepClone,
  isEmpty,
  generateCSV,
  parseCSV
};