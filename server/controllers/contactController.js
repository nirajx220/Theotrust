const Contact = require('../models/Contact');
const { sendContactConfirmation, notifyAdminNewContact } = require('../config/email');

// Handle contact form submission
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, inquiryType } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Subject is required',
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Validate phone if provided
    if (phone && phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone format',
        });
      }
    }

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      inquiryType: inquiryType || 'general',
    });

    // Send confirmation email to user
    try {
      await sendContactConfirmation(contact);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    // Notify admin
    try {
      await notifyAdminNewContact(contact);
    } catch (emailError) {
      console.error('Admin notification failed:', emailError);
    }

    res.json({
      success: true,
      message: 'Thank you for contacting us. We will respond within 24-48 hours.',
      reference: contact.reference,
    });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
    });
  }  }

// Get all contact submissions (admin)
exports.getAllContacts = async (req, res) => {
  try {
    // If you have a Contact model:
    // const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      contacts: [],
      message: 'Contact model not implemented yet',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
};