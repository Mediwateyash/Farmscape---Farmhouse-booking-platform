const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Farmhouse = require('./models/Farmhouse');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const farmhouses = [
    {
        name: 'Sukh Vihar Farm',
        location: 'Lonavala, Maharashtra',
        price: 12000,
        description: 'A luxurious farmhouse with a private pool and lush green gardens. Perfect for family getaways.',
        amenities: ['Swimming Pool', 'Wifi', 'Cricket Turf', 'BBQ'],
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
        name: 'Coorg Coffee Estate',
        location: 'Coorg, Karnataka',
        price: 8500,
        description: 'Stay in the middle of a coffee plantation. Enjoy the misty mornings and fresh brew.',
        amenities: ['Plantation Walk', 'Bonfire', 'Home Cooked Food'],
        images: ['https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
        name: 'Himalayan Retreat',
        location: 'Manali, Himachal Pradesh',
        price: 15000,
        description: 'Experience the snow-capped mountains from your balcony. Cozy wooden cottage.',
        amenities: ['Heater', 'Mountain View', 'Trekking Guide'],
        images: ['https://images.unsplash.com/photo-1518730518541-d0843268c287?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
        name: 'Kerala Backwaters Villa',
        location: 'Alleppey, Kerala',
        price: 10000,
        description: 'Traditional Kerala style villa right on the backwaters. Includes a canoe ride.',
        amenities: ['Ayurvedic Spa', 'Boating', 'AC Rooms'],
        images: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    }
];

const seedFarmhouses = async () => {
    try {
        await Farmhouse.deleteMany(); // Clear existing
        await Farmhouse.insertMany(farmhouses);
        console.log('Farmhouses Seeded!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedFarmhouses();
