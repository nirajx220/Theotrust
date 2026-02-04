const crypto = require('crypto');

/**
 * Generate a unique reference ID for donations
 */
const generateDonationReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  
  return `DON-${year}${month}${day}-${random}`;
};

/**
 * Generate a unique reference ID for contacts
 */
const generateContactReference = () => {
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
const formatCurrency = (amount, currency = 'GBP') => {
  const symbols = {
    GBP: '£',
    USD: '$',
    EUR: '€'
  };
  
  // Validate and coerce amount
  const parsed = parseFloat(amount);
  const validAmount = Number.isFinite(parsed) ? parsed : 0;
  
  return `${symbols[currency] || '£'}${validAmount.toFixed(2)}`;
};

/**
 * Sanitize user input (basic HTML escaping)
 * Note: For rich text, use a proper library like DOMPurify or sanitize-html
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .substring(0, 1000);
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate pagination metadata
 */
const getPaginationMetadata = (total, page, limit) => {
  // Ensure limit is valid to avoid division by zero or Infinity
  const validLimit = (limit && limit > 0) ? limit : 10;
  const totalPages = Math.ceil(total / validLimit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    total,
    totalPages,
    currentPage: page,
    perPage: validLimit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
  };
};

/**
 * Validate phone number format
 */
const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

/**
 * Format date to readable string
 */
const formatDate = (date, locale = 'en-GB') => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Calculate days until a future date
 */
const daysUntil = (futureDate) => {
  const now = new Date();
  const future = new Date(futureDate);
  const diffTime = future - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

/**
 * Generate URL-friendly slug from string
 */
const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Calculate UK Gift Aid (25% on top of donation)
 */
const calculateGiftAid = (amount) => {
  const parsed = parseFloat(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return parsed * 0.25;
};

/**
 * Retry async operation with exponential backoff
 */
const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

/**
 * Deep clone an object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate CSV from array of objects
 */
const generateCSV = (data, fields) => {
  if (!Array.isArray(data) || data.length === 0) return '';
  
  const headers = fields || Object.keys(data[0]);
  const csvRows = [];
  
  // Add header row
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      const escaped = ('' + value).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

module.exports = {
  generateDonationReference,
  generateContactReference,
  formatCurrency,
  sanitizeInput,
  isValidEmail,
  getPaginationMetadata,
  isValidPhone,
  formatDate,
  daysUntil,
  generateSlug,
  calculateGiftAid,
  retryWithBackoff,
  deepClone,
  generateCSVence,
  generateContactReference,
  formatCurrency,
  sanitizeInput,
  isValidEmail,
  getPaginationMetadata,
};