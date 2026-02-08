const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000)
        const c = new Campground({
            location: `${cities[random].city}, ${cities[random].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        })
        await c.save()
    }
}

seedDb().then(()=>{
    mongoose.connection.close()
})