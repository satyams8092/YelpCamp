// seeds/migrateGeometry.js
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const maptilerClient = require('@maptiler/client');
require('dotenv').config();

maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const migrate = async () => {
    const campgrounds = await Campground.find({ geometry: { $exists: false } });
    for (let camp of campgrounds) {
        const geoData = await maptilerClient.geocoding.forward(camp.location, { limit: 1 });
        if (geoData.features?.length) {
            camp.geometry = geoData.features[0].geometry;
            await camp.save();
            console.log(`Updated: ${camp.title}`);
        }
    }
    mongoose.connection.close();
}

migrate();