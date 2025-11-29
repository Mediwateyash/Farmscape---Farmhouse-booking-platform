const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookingById,
    getMyBookings,
    getBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/mybookings/:userId', getMyBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);

module.exports = router;
