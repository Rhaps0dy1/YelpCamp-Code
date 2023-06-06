const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your user ID
            author: '6307a26a9cb844b3e9d7431a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis accusantium, labore ex nam quidem ducimus consequuntur atque accusamus, rerum hic quos dicta voluptatibus! Sapiente, expedita quae! Assumenda sit inventore nulla?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dm09ugivq/image/upload/v1661633968/YelpCamp/lufyonvdnpcd99jmhppr.jpg',
                  filename: 'YelpCamp/lufyonvdnpcd99jmhppr',
                },
                {
                  url: 'https://res.cloudinary.com/dm09ugivq/image/upload/v1661633967/YelpCamp/cnll4l7kwuxlak338aji.jpg',
                  filename: 'YelpCamp/cnll4l7kwuxlak338aji',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})