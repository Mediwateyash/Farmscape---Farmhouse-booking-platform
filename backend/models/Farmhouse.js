const mongoose = require('mongoose');

const farmhouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    images: {
        type: [String], // Array of image URLs/paths
        required: true,
    },
}, {
    timestamps: true,
});

const Farmhouse = mongoose.model('Farmhouse', farmhouseSchema);

module.exports = Farmhouse;
