const nodemailer = require('nodemailer');

// HTML escape utility to prevent injection
const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Mask email for logging (prevent PII exposure)
const maskEmail = (email) => {
  if (!email) return 'unknown';
  const parts = email.split('@');
  if (parts.length !== 2) return 'invalid';
  const username = parts[0];
  const domain = parts[1];
  const masked = username.length > 2 
    ? username.substring(0, 2) + '***' 
    : '***';
  return `${masked}@${domain}`;
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send donation confirmation email
const sendDonationConfirmation = async (donation) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER}>`,
    to: donation.donorEmail,
    subject: 'Thank You for Your Donation - TheoTrust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Generous Donation!</h2>
        <p>Dear ${donation.donorName},</p>
        <p>Thank you for your donation of <strong>${donation.currency} ${donation.amount}</strong>.</p>
        <p>Your contribution will help us continue our mission to empower children globally through education.</p>
        <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Donation Details:</h3>
          <p><strong>Amount:</strong> ${donation.currency} ${donation.amount}</p>
          <p><strong>Date:</strong> ${new Date(donation.completedAt).toLocaleDateString()}</p>
          <p><strong>Reference:</strong> ${donation._id}</p>
        </div>
        <p>This email serves as your receipt for tax purposes.</p>
        <p>Best regards,<br>The TheoTrust Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Donation confirmation email sent to ${donation.donorEmail}`);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send contact form confirmation
const sendContactConfirmation = async (contact) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject: 'We Received Your Message - TheoTrust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear ${contact.name},</p>
        <p>We have received your message and will respond within 24-48 hours.</p>
        <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Your Message:</h3>
          <p>${contact.message}</p>
        </div>
        <p>Best regards,<br>The TheoTrust Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact confirmation email sent to ${contact.email}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Notify admin of new contact
const notifyAdminNewContact = async (contact) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Form Submission - ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Inquiry Type:</strong> ${contact.inquiryType}</p>
        <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Message:</h3>
          <p>${contact.message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notified of new contact');
  } catch (error) {
    console.error('Admin notification error:', error);
  }
};

module.exports = {
  sendDonationConfirmation,
  sendContactConfirmation,
  notifyAdminNewContact,
};