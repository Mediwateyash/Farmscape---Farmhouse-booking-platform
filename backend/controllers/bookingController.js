const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  User
const createBooking = async (req, res) => {
    const { user, farmhouse, date, guests, totalPrice, phoneNumber } = req.body;

    try {
        const booking = new Booking({
            user,
            farmhouse,
            date,
            guests,
            totalPrice,
            phoneNumber,
            status: 'Pending',
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  User/Admin
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('farmhouse', 'name location');

        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings/:userId
// @access  User
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('farmhouse', 'name location');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'id name email').populate('farmhouse', 'id name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Admin
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            booking.status = status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getMyBookings,
    getBookings,
    updateBookingStatus,
};
