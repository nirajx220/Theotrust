const validateDonation = (req, res, next) => {
  const { amount, donorEmail, donorName } = req.body;

  const errors = [];

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    errors.push('Valid donation amount is required');
  }

  if (!donorEmail || !/^\S+@\S+\.\S+$/.test(donorEmail)) {
    errors.push('Valid email is required');
  }

  if (!donorName || donorName.trim().length < 2) {
    errors.push('Donor name must be at least 2 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;

  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = {
  validateDonation,
  validateContact,
};