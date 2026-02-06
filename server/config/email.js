const nodemailer = require('nodemailer');

// HTML escape utility to prevent injection
const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
};

// Mask email for logging (PII protection)
const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!domain) return '***';
  return `${name.substring(0, 2)}***@${domain}`;
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

  // Sanitize all user inputs
  const donorName = escapeHtml(donation.donorName || '');
  const currency = escapeHtml(donation.currency || 'GBP');
  const amount = escapeHtml(String(donation.amount || '0'));
  const donationId = escapeHtml(String(donation._id || ''));
  const completedDate = donation.completedAt ? new Date(donation.completedAt).toLocaleDateString() : 'N/A';

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER || 'theotrust1998@gmail.com'}>`,
    to: donation.donorEmail,
    subject: 'Thank You for Your Donation - TheoTrust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937;">Dear ${donorName},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for your generous donation of <strong>${currency} ${amount}</strong>.
          </p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Your contribution will help us continue our mission to empower children globally through education, 
            healthcare, and sustainable development programs.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h3 style="color: #1f2937; margin-top: 0;">Donation Details:</h3>
            <p style="color: #4b5563; margin: 8px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
            <p style="color: #4b5563; margin: 8px 0;"><strong>Date:</strong> ${completedDate}</p>
            <p style="color: #4b5563; margin: 8px 0;"><strong>Reference:</strong> ${donationId}</p>
          </div>
          <p style="color: #4b5563; font-size: 14px;">
            This email serves as your receipt for tax purposes.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              <strong>TheoTrust</strong><br/>
              Paradise Farm, Burton Rd., Needwood<br/>
              Burton on Trent, Staffs. DE13 9PB<br/>
              Tel: +44 7976 427791<br/>
              Email: theotrust1998@gmail.com<br/>
              Website: <a href="https://theotrust.org" style="color: #2563eb;">www.theotrust.org</a>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Donation confirmation email sent to ${maskEmail(donation.donorEmail)}`);
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send contact form confirmation
const sendContactConfirmation = async (contact) => {
  const transporter = createTransporter();

  // Sanitize inputs
  const name = escapeHtml(contact.name || '');
  const message = escapeHtml(contact.message || '');

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER || 'theotrust1998@gmail.com'}>`,
    to: contact.email,
    subject: 'We Received Your Message - TheoTrust',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937;">Dear ${name},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            We have received your message and will respond within 24-48 hours.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Message:</h3>
            <p style="color: #4b5563;">${message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              <strong>TheoTrust</strong><br/>
              Paradise Farm, Burton Rd., Needwood<br/>
              Burton on Trent, Staffs. DE13 9PB<br/>
              Tel: +44 7976 427791<br/>
              Email: theotrust1998@gmail.com<br/>
              Website: <a href="https://theotrust.org" style="color: #2563eb;">www.theotrust.org</a>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact confirmation email sent to ${maskEmail(contact.email)}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Notify admin of new contact
const notifyAdminNewContact = async (contact) => {
  const transporter = createTransporter();

  // Sanitize all inputs
  const name = escapeHtml(contact.name || '');
  const email = escapeHtml(contact.email || '');
  const phone = escapeHtml(contact.phone || 'N/A');
  const subject = escapeHtml(contact.subject || '');
  const inquiryType = escapeHtml(contact.inquiryType || '');
  const message = escapeHtml(contact.message || '');

  const mailOptions = {
    from: `"TheoTrust" <${process.env.SMTP_USER || 'theotrust1998@gmail.com'}>`,
    to: process.env.ADMIN_EMAIL || 'theotrust1998@gmail.com',
    subject: `New Contact Form Submission - ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">New Contact Form Submission</h2>
        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <p style="color: #4b5563;"><strong>Name:</strong> ${name}</p>
          <p style="color: #4b5563;"><strong>Email:</strong> ${email}</p>
          <p style="color: #4b5563;"><strong>Phone:</strong> ${phone}</p>
          <p style="color: #4b5563;"><strong>Subject:</strong> ${subject}</p>
          <p style="color: #4b5563;"><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563;">${message}</p>
          </div>
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