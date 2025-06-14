const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Create booking
router.post('/', auth, async (req, res) => {
  const { listingId, startDate, endDate, totalPrice } = req.body;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ msg: 'Listing not found' });

    // Basic availability check
    const isAvailable = listing.availableDates.some(
      (date) => new Date(startDate) >= new Date(date.start) && new Date(endDate) <= new Date(date.end)
    );
    if (!isAvailable) return res.status(400).json({ msg: 'Dates not available' });

    const booking = new Booking({
      listing: listingId,
      user: req.user.userId,
      startDate,
      endDate,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate('listing', 'title location');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;