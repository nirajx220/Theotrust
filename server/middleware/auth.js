const protect = (req, res, next) => {
  // TODO: Implement JWT authentication
  // For now, just pass through
  next();
};

module.exports = { protect };
