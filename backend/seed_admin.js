const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

// Override MONGO_URI if passed as argument
if (process.argv[2]) {
    process.env.MONGO_URI = process.argv[2];
}

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to: ${mongoose.connection.host}`);

        await Admin.deleteMany(); // Clear existing admins

        const admin = await Admin.create({
            email: 'admin@example.com',
            password: 'adminpassword' // This will be hashed by the pre-save hook in Admin model
        });

        console.log('Admin Created Successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: adminpassword');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
