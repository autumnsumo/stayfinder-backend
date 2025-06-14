import pymongo
from datetime import datetime

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["stayfinder"]

# Clear existing data
db.users.drop()
db.listings.drop()
db.bookings.drop()

# Seed Users
users = [
    {"email": "host@example.com", "password": "$2a$10$examplehash", "name": "Host User", "isHost": True},
    {"email": "guest@example.com", "password": "$2a$10$examplehash", "name": "Guest User", "isHost": False},
]
db.users.insert_many(users)

# Seed Listings
listings = [
    {
        "title": "Cozy Beachfront Cottage",
        "description": "A charming cottage by the sea.",
        "location": "Malibu, CA",
        "price": 150,
        "images": ["https://via.placeholder.com/300"],
        "host": db.users.find_one({"email": "host@example.com"})["_id"],
        "availableDates": [
            {"start": datetime(2025, 6, 15), "end": datetime(2025, 12, 31)}
        ],
    },
    {
        "title": "Urban Loft",
        "description": "Modern loft in the city center.",
        "location": "New York, NY",
        "price": 200,
        "images": ["https://via.placeholder.com/300"],
        "host": db.users.find_one({"email": "host@example.com"})["_id"],
        "availableDates": [
            {"start": datetime(2025, 6, 15), "end": datetime(2025, 12, 31)}
        ],
    },
]
db.listings.insert_many(listings)

print("Database seeded successfully")