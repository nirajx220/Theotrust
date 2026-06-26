# TheoTrust Charity Platform - Backend API

A comprehensive backend API for the TheoTrust charity platform, built with Node.js, Express, and MongoDB. This API provides full support for donation management, program tracking, event coordination, user authentication, and contact form handling with Wonderful.org integration.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth with role-based access control (Admin, Moderator, User)
- **Donation Management**: Wonderful.org payment integration with webhook support
- **Program Management**: CRUD operations for charity programs with progress tracking
- **Event Management**: Complete event lifecycle management with registration capability
- **Contact System**: Contact form handling with email notifications
- **Statistics & Analytics**: Real-time donation and program statistics
- **Email Notifications**: Automated emails for donations, contact forms, and confirmations
- **Security**: Input validation, sanitization, password hashing, and secure authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Gmail/SMTP account for emails
- Wonderful.org API credentials

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd theotrust-charity/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/theotrust-charity
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=admin@theotrust.org
   WONDERFUL_API_KEY=your-wonderful-api-key
   WONDERFUL_SECRET_KEY=your-wonderful-secret-key
   WONDERFUL_CHARITY_ID=your-charity-id
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

### Donations

#### Create Donation Session
```http
POST /api/donations
Content-Type: application/json

{
  "amount": 50.00,
  "currency": "USD",
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "message": "Keep up the great work!"
}
```

#### Verify Donation Payment
```http
GET /api/donations/verify/:sessionId
```

#### Get Donation Statistics
```http
GET /api/donations/stats
```

#### Get All Donations (Admin)
```http
GET /api/donations/admin?page=1&limit=10&status=completed
Authorization: Bearer <admin-token>
```

### Programs

#### Get All Programs
```http
GET /api/programs
```

#### Get Single Program
```http
GET /api/programs/:id
```

#### Create Program (Admin)
```http
POST /api/programs
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Education Initiative",
  "description": "Providing education to underprivileged children",
  "category": "education",
  "targetAmount": 50000,
  "location": {
    "country": "USA",
    "city": "New York"
  }
}
```

#### Update Program (Admin)
```http
PUT /api/programs/:id
Authorization: Bearer <admin-token>
```

#### Delete Program (Admin)
```http
DELETE /api/programs/:id
Authorization: Bearer <admin-token>
```

### Events

#### Get All Events
```http
GET /api/events?page=1&limit=10&eventType=fundraiser
```

#### Get Upcoming Events
```http
GET /api/events/upcoming?limit=5
```

#### Get Single Event
```http
GET /api/events/:id
```

#### Register for Event
```http
POST /api/events/:id/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "attendees": 1
}
```

#### Create Event (Admin)
```http
POST /api/events
Authorization: Bearer <admin-token>
```

#### Update Event (Admin)
```http
PUT /api/events/:id
Authorization: Bearer <admin-token>
```

### Contact

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "I would like to know more about your programs",
  "inquiryType": "general"
}
```

#### Get All Contacts (Admin)
```http
GET /api/contact?page=1&limit=10&status=new
Authorization: Bearer <admin-token>
```

#### Update Contact Status (Admin)
```http
PUT /api/contact/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "replied",
  "notes": "Responded to inquiry"
}
```

### Users

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+1234567890"
}
```

#### Change Password
```http
PUT /api/users/profile/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Get All Users (Admin)
```http
GET /api/users?page=1&limit=10&role=admin
Authorization: Bearer <admin-token>
```

#### Create User (Admin)
```http
POST /api/users
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

### Statistics

#### Get Platform Statistics
```http
GET /api/stats
```

Response includes:
- Total donations and amount
- Active donors count
- Active programs count
- Recent donations
- Monthly statistics

### Webhooks

#### Wonderful.org Webhook
```http
POST /api/webhooks/wonderful
X-Wonderful-Signature: <signature>
Content-Type: application/json
```

## 🗂️ Project Structure

```
server/
├── config/              # Configuration files
│   ├── db.js           # MongoDB connection
│   ├── email.js        # Email service setup
│   └── wonderful.js    # Wonderful.org API integration
├── controllers/         # Request handlers
│   ├── donationController.js
│   ├── programController.js
│   ├── eventController.js
│   ├── contactController.js
│   └── userController.js
├── middleware/          # Custom middleware
│   ├── auth.js         # Authentication & authorization
│   ├── errorHandler.js # Error handling
│   └── validation.js   # Input validation
├── models/             # MongoDB schemas
│   ├── Donation.js
│   ├── Program.js
│   ├── Event.js
│   ├── Contact.js
│   └── User.js
├── routes/             # API routes
│   ├── auth.routes.js
│   ├── donation.routes.js
│   ├── program.routes.js
│   ├── event.routes.js
│   ├── contact.routes.js
│   ├── user.routes.js
│   ├── stats.routes.js
│   └── webhook.routes.js
├── utils/              # Utility functions
│   └── helper.js
├── .env.example        # Environment variables template
├── package.json        # Dependencies
├── README.md          # This file
├── SECURITY_FIXES.md  # Security documentation
└── server.js          # Application entry point
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Comprehensive validation on all endpoints
- **Input Sanitization**: HTML escaping to prevent XSS
- **Role-Based Access Control**: Admin, Moderator, and User roles
- **MongoDB Injection Prevention**: Mongoose sanitization
- **Rate Limiting**: Configurable request rate limits
- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data in .env files
- **Email Masking**: PII protection in logs

## 📧 Email Configuration

For Gmail, you need to generate an App Password:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `SMTP_PASS`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📝 Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

TheoTrust Team

## 🆘 Support

For support, email admin@theotrust.org or create an issue in the repository.

## 🔗 Additional Resources

- [Wonderful.org API Documentation](https://docs.wonderful.org)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Documentation](https://expressjs.com)
- [JWT Documentation](https://jwt.io)

## ⚠️ Important Notes

1. **Change Default Credentials**: Always change default JWT secret and admin credentials
2. **Database Backups**: Implement regular database backup strategy
3. **SSL/TLS**: Use HTTPS in production
4. **Environment Variables**: Never commit .env files to version control
5. **Monitoring**: Implement logging and monitoring in production
6. **API Rate Limiting**: Configure appropriate rate limits for your use case

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production` in .env
- [ ] Use strong JWT_SECRET (at least 32 characters)
- [ ] Configure MongoDB with authentication
- [ ] Set up SSL certificates
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure automatic backups
- [ ] Test all API endpoints
- [ ] Review security settings

### Deployment Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **DigitalOcean**: Full control with droplets
- **AWS EC2**: Scalable cloud hosting
- **Railway**: Simple modern deployment
- **Render**: Free tier available

---

Built with ❤️ by the TheoTrust Team
