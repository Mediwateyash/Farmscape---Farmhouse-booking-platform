const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();

        const adminUser = {
            email: 'admin@example.com',
            password: 'adminpassword',
        };

        await Admin.create(adminUser);

        console.log('Admin Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroyData(); // Not implemented
} else {
    importData();
}
