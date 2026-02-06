// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const donationRoutes = require('./routes/donation.routes');
const programRoutes = require('./routes/program.routes');
const contactRoutes = require('./routes/contact.routes');
const statsRoutes = require('./routes/stats.routes');
const userRoutes = require('./routes/user.routes');
const webhookRoutes = require('./routes/webhook.routes');
const authRoutes = require('./routes/auth.routes'); // Add this line

app.use('/api/donations', donationRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/auth', authRoutes); // Add this line

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});