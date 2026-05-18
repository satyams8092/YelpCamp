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
    let rand = Math.floor(Math.random() * 3000) + 10
    for (let i = 0; i < 50; i++) {
        const random = Math.floor(Math.random() * 1000)
        const c = new Campground({
            author:'6a0aa2678452de45d55f8f2d',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://picsum.photos/200",
            description: 'Good availability and great rates for a place to camp. Read property reviews and choose the best deal for your stay.',
            price: rand
        })
        await c.save()
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})