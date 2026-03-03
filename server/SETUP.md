# Backend Quick Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Required Configuration
MONGODB_URI=mongodb://localhost:27017/theotrust-charity
JWT_SECRET=your-super-secret-jwt-key-change-this
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
WONDERFUL_API_KEY=your-wonderful-api-key
WONDERFUL_SECRET_KEY=your-wonderful-secret-key
WONDERFUL_CHARITY_ID=your-charity-id
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Windows (as a service)
net start MongoDB

# Linux
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed Database
Create initial admin user and sample programs:
```bash
npm run seed
```

This will create:
- **Admin User**: admin@theotrust.org / Admin@123
- **Sample Programs**: Education, Clean Water, Emergency Relief

### 5. Start Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on: `http://localhost:5000`

## 🧪 Test the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@theotrust.org",
    "password": "Admin@123"
  }'
```

### Get Programs
```bash
curl http://localhost:5000/api/programs
```

### Get Statistics
```bash
curl http://localhost:5000/api/stats
```

## 📁 Project Structure

```
server/
├── config/              # Configuration files
│   ├── db.js           # MongoDB connection
│   ├── email.js        # Email service
│   └── wonderful.js    # Payment integration
├── controllers/         # Business logic
│   ├── contactController.js
│   ├── donationController.js
│   ├── eventController.js
│   ├── programController.js
│   └── userController.js
├── middleware/          # Express middleware
│   ├── auth.js         # Authentication
│   ├── errorHandler.js
│   └── validation.js
├── models/             # Database schemas
│   ├── Contact.js
│   ├── Donation.js
│   ├── Event.js
│   ├── Program.js
│   └── User.js
├── routes/             # API endpoints
│   ├── auth.routes.js
│   ├── contact.routes.js
│   ├── donation.routes.js
│   ├── event.routes.js
│   ├── program.routes.js
│   ├── stats.routes.js
│   ├── user.routes.js
│   └── webhook.routes.js
├── utils/              # Helper functions
│   └── helper.js
├── .env.example        # Environment template
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies
├── README.md          # Full documentation
├── seed.js            # Database seeder
├── SECURITY_FIXES.md  # Security docs
└── server.js          # Entry point
```

## 🔑 Default Credentials

After running `npm run seed`:

**Admin Account:**
- Email: `admin@theotrust.org`
- Password: `Admin@123`

⚠️ **IMPORTANT**: Change this password immediately after first login!

## 📡 API Endpoints

### Public Endpoints
- `POST /api/auth/admin/login` - Admin login
- `GET /api/programs` - List programs
- `GET /api/events` - List events
- `POST /api/donations` - Create donation
- `POST /api/contact` - Submit contact form
- `GET /api/stats` - Platform statistics

### Protected Endpoints (Require Authentication)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/profile/password` - Change password

### Admin Endpoints (Require Admin Role)
- `GET /api/donations/admin` - List all donations
- `POST /api/programs` - Create program
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program
- `GET /api/contact` - List all contacts
- `GET /api/users` - List all users
- And more...

## 🛠️ Development Tips

### View Database
Use MongoDB Compass to visualize your data:
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Database name: `theotrust-charity`

### Test Authentication
1. Login to get token:
   ```bash
   curl -X POST http://localhost:5000/api/auth/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@theotrust.org","password":"Admin@123"}'
   ```

2. Use token in subsequent requests:
   ```bash
   curl http://localhost:5000/api/users/profile \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

### Email Configuration (Gmail)
1. Enable 2-Factor Authentication
2. Go to: https://myaccount.google.com/apppasswords
3. Generate app password
4. Use in `SMTP_PASS` variable

### Reset Database
To clear and reseed database:
```bash
npm run seed
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service

### JWT Verification Failed
```
Error: jwt malformed
```
**Solution**: Check if `JWT_SECRET` is set in `.env`

### Email Not Sending
```
Error: Invalid login
```
**Solution**: 
1. Check SMTP credentials
2. Enable "Less secure apps" or use App Password for Gmail

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change `PORT` in `.env` or kill process on port 5000

## 📚 Next Steps

1. ✅ Change admin password
2. ✅ Configure email settings
3. ✅ Set up Wonderful.org API keys
4. ✅ Create additional programs
5. ✅ Test donation flow
6. ✅ Customize for your needs

## 🔗 Additional Resources

- [Full API Documentation](README.md)
- [Security Documentation](SECURITY_FIXES.md)
- [MongoDB Docs](https://docs.mongodb.com)
- [Express.js Docs](https://expressjs.com)
- [Wonderful.org API](https://docs.wonderful.org)

## 💡 Support

For issues or questions:
- Check [README.md](README.md) for detailed documentation
- Review [SECURITY_FIXES.md](SECURITY_FIXES.md) for security info
- Open an issue in the repository

---

Happy coding! 🎉
