const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61fcffb745f31941d45554f2",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                    url: 'https://res.cloudinary.com/rahima/image/upload/v1645173156/YelpCamp/qnnn5e5q0sqkmuyuxmxn.jpg',
                    filename: 'YelpCamp/qnnn5e5q0sqkmuyuxmxn'
                },
                {
                    url: 'https://res.cloudinary.com/rahima/image/upload/v1645172874/YelpCamp/vt8tb3j6mrxt8mphfqgl.jpg',
                    filename: 'YelpCamp/vt8tb3j6mrxt8mphfqgl'
                },
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
             geometry: {
                type: "Point",
                coordinates: [68.1331, 67.0202]
            },
            price
        })
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
});