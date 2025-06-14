const express = require('express');
  const jwt = require('jsonwebtoken');
  const Listing = require('../models/Listing');
  const User = require('../models/User');
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

  // Get all listings
  router.get('/', async (req, res) => {
    try {
      const { location, maxPrice } = req.query; // Removed startDate for now
      const query = {};
      if (location) query.location = new RegExp(location, 'i');
      if (maxPrice) query.price = { $lte: Number(maxPrice) };
      // Temporarily remove date filtering
      // if (startDate) {
      //   query.availableDates = {
      //     $elemMatch: { start: { $lte: new Date(startDate) }, end: { $gte: new Date(startDate) } },
      //   };
      // }
      const listings = await Listing.find(query).populate('host', 'name');
      res.json(listings);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Get single listing
  router.get('/:id', async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id).populate('host', 'name');
      if (!listing) return res.status(404).json({ msg: 'Listing not found' });
      res.json(listing);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Create listing (host only)
  router.post('/', auth, async (req, res) => {
    const { title, description, location, price, images, availableDates } = req.body;
    try {
      const user = await User.findById(req.user.userId);
      if (!user.isHost) return res.status(403).json({ msg: 'Not authorized as host' });

      const listing = new Listing({
        title,
        description,
        location,
        price,
        images,
        availableDates,
        host: req.user.userId,
      });
      await listing.save();
      res.status(201).json(listing);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Update listing (host only)
  router.put('/:id', auth, async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) return res.status(404).json({ msg: 'Listing not found' });
      if (listing.host.toString() !== req.user.userId) {
        return res.status(403).json({ msg: 'Not authorized' });
      }

      const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  // Delete listing (host only)
  router.delete('/:id', auth, async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) return res.status(404).json({ msg: 'Listing not found' });
      if (listing.host.toString() !== req.user.userId) {
        return res.status(403).json({ msg: 'Not authorized' });
      }

      await Listing.deleteOne({ _id: req.params.id });
      res.json({ msg: 'Listing deleted' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  module.exports = router;