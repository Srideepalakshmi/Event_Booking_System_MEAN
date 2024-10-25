const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// POST endpoint to handle booking
router.post('/book', async (req, res) => {
    try {
        const bookingData = new Booking(req.body);
        await bookingData.save();
        res.status(201).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'There was an error saving your booking.' });
    }
});

// GET endpoint to retrieve all bookings
router.get('/list', async (req, res) => {
    try {
        const bookings = await Booking.find();
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found.' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'There was an error retrieving bookings.' });
    }
});

// GET endpoint to retrieve bookings for a specific user
router.get('/user/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const bookings = await Booking.find({ email: userEmail });
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user.' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'There was an error retrieving bookings.' });
    }
});

module.exports = router;
