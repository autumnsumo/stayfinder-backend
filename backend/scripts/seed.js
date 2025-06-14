const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Listing = require('../models/Listing');

const seed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/stayfinder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    await User.deleteMany({});
    await Listing.deleteMany({});
    console.log('Existing data cleared');

    const users = [
      {
        email: 'host@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Host User',
        isHost: true,
      },
      {
        email: 'guest@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Guest User',
        isHost: false,
      },
    ];
    const insertedUsers = await User.insertMany(users);
    console.log('Users seeded');

    const listings = [
      // Existing Listings
      {
        title: 'Cozy Beachfront Cottage',
        description: 'A charming cottage by the sea.',
        location: 'Malibu, CA',
        price: 150,
        images: ['https://i.imgur.com/sample-cottage.jpg'], // Replace with your previously selected URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Urban Loft',
        description: 'Modern loft in the city center.',
        location: 'New York, NY',
        price: 200,
        images: ['https://picsum.photos/300'],
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      // New Listings
      {
        title: 'Mountain Cabin Retreat',
        description: 'A cozy cabin nestled in the Rocky Mountains, perfect for a winter getaway.',
        location: 'Aspen, CO',
        price: 180,
        images: ['https://picsum.photos/seed/mountain-cabin/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Desert Oasis Villa',
        description: 'A luxurious villa with a private pool in the heart of the desert.',
        location: 'Palm Springs, CA',
        price: 250,
        images: ['https://picsum.photos/seed/desert-villa/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Lakeside Cottage',
        description: 'A serene cottage with stunning lake views, ideal for nature lovers.',
        location: 'Lake Tahoe, NV',
        price: 160,
        images: ['https://picsum.photos/seed/lakeside-cottage/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Downtown Penthouse',
        description: 'A sleek penthouse with panoramic city views, close to the Magnificent Mile.',
        location: 'Chicago, IL',
        price: 300,
        images: ['https://picsum.photos/seed/downtown-penthouse/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Vineyard Estate',
        description: 'A charming estate surrounded by vineyards, perfect for wine enthusiasts.',
        location: 'Napa Valley, CA',
        price: 220,
        images: ['https://picsum.photos/seed/vineyard-estate/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Historic Townhouse',
        description: 'A beautifully restored townhouse in the historic district, full of Southern charm.',
        location: 'Savannah, GA',
        price: 140,
        images: ['https://picsum.photos/seed/historic-townhouse/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Beachfront Bungalow',
        description: 'A colorful bungalow steps away from the sandy beaches of South Beach.',
        location: 'Miami, FL',
        price: 190,
        images: ['https://picsum.photos/seed/beach-bungalow/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Rustic Farmhouse',
        description: 'A quaint farmhouse surrounded by rolling hills, ideal for a peaceful retreat.',
        location: 'Burlington, VT',
        price: 130,
        images: ['https://picsum.photos/seed/rustic-farmhouse/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Modern Condo',
        description: 'A stylish condo near the Space Needle, perfect for exploring the city.',
        location: 'Seattle, WA',
        price: 210,
        images: ['https://picsum.photos/seed/modern-condo/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
      {
        title: 'Ski Chalet',
        description: 'A cozy chalet with ski-in/ski-out access, perfect for winter sports enthusiasts.',
        location: 'Park City, UT',
        price: 270,
        images: ['https://picsum.photos/seed/ski-chalet/300/300'], // Replace with real URL
        host: insertedUsers.find(user => user.email === 'host@example.com')._id,
        availableDates: [
          { start: new Date('2025-06-14'), end: new Date('2025-12-31') },
        ],
      },
    ];
    await Listing.insertMany(listings);
    console.log('Listings seeded');

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seed();