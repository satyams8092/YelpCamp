const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'my backyard',
        description: 'cheap camping'
    })
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})