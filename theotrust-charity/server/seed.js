const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Program = require('./models/Program');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/theotrust-charity');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Sample data
const samplePrograms = [
  {
    name: 'Education for All',
    slug: 'education-for-all',
    description: 'Providing quality education to underprivileged children across the globe.',
    longDescription: 'Our Education for All program focuses on breaking down barriers to education by providing school supplies, scholarships, and building educational infrastructure in underserved communities. We believe that every child deserves access to quality education regardless of their economic background.',
    category: 'education',
    location: {
      country: 'Multiple Countries',
      region: 'Global',
    },
    targetAmount: 100000,
    currentAmount: 45000,
    currency: 'USD',
    beneficiaries: 500,
    isActive: true,
    isFeatured: true,
    order: 1,
    impact: [
      {
        title: 'Students Supported',
        description: 'Number of students receiving educational support',
        value: '500+'
      },
      {
        title: 'Schools Built',
        description: 'New schools constructed in rural areas',
        value: '12'
      },
      {
        title: 'Scholarships',
        description: 'Full scholarships awarded',
        value: '150'
      }
    ]
  },
  {
    name: 'Clean Water Initiative',
    slug: 'clean-water-initiative',
    description: 'Building wells and water purification systems in communities without access to clean water.',
    longDescription: 'Access to clean water is a fundamental human right. Our Clean Water Initiative works to provide sustainable water solutions to communities in need by building wells, installing filtration systems, and educating locals on water conservation and hygiene practices.',
    category: 'health',
    location: {
      country: 'Africa',
      region: 'Sub-Saharan Africa',
    },
    targetAmount: 75000,
    currentAmount: 30000,
    currency: 'USD',
    beneficiaries: 2000,
    isActive: true,
    isFeatured: true,
    order: 2,
    impact: [
      {
        title: 'Wells Built',
        description: 'Clean water wells constructed',
        value: '25'
      },
      {
        title: 'People Served',
        description: 'Community members with access to clean water',
        value: '2000+'
      }
    ]
  },
  {
    name: 'Emergency Relief Fund',
    slug: 'emergency-relief-fund',
    description: 'Rapid response to natural disasters and humanitarian crises.',
    longDescription: 'When disaster strikes, time is of the essence. Our Emergency Relief Fund enables us to respond quickly to natural disasters, conflicts, and humanitarian crises by providing food, shelter, medical supplies, and other essential aid to those affected.',
    category: 'emergency',
    location: {
      country: 'Global',
      region: 'Worldwide',
    },
    targetAmount: 200000,
    currentAmount: 85000,
    currency: 'USD',
    beneficiaries: 5000,
    isActive: true,
    isFeatured: false,
    order: 3,
    impact: [
      {
        title: 'Families Helped',
        description: 'Families receiving emergency assistance',
        value: '1200+'
      },
      {
        title: 'Relief Packages',
        description: 'Emergency relief packages distributed',
        value: '5000+'
      }
    ]
  }
];

// Seed database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Program.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@theotrust.org',
      password: 'Admin@123', // Change this in production!
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create sample programs
    console.log('\nCreating sample programs...');
    for (const programData of samplePrograms) {
      programData.createdBy = adminUser._id;
      const program = await Program.create(programData);
      console.log(`✅ Program created: ${program.name}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📧 Admin Login Credentials:');
    console.log('   Email: admin@theotrust.org');
    console.log('   Password: Admin@123');
    console.log('\n⚠️  Please change the admin password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
