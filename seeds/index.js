require("dotenv").config();
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "64d29b38aa6ad8c98d931e55",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png",
          filename: "YelpCamp/ahfnenvca4tha00h2ubt",
        },
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png",
          filename: "YelpCamp/ruyoaxgf72nzpi4y6cdi",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
// const mongoose = require("mongoose");
// const cities = require("./cities");
// const { places, descriptors } = require("./seedHelpers");
// const Campground = require("../models/campground");

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected");
// });

// const sample = (array) => array[Math.floor(Math.random() * array.length)];

// const seedDB = async () => {
//   await Campground.deleteMany({});
//   for (let i = 0; i < 50; i++) {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const price = Math.floor(Math.random() * 20) + 10;
//     const camp = new Campground({
//       author: "64d29b38aa6ad8c98d931e55",
//       location: `${cities[random1000].city}, ${cities[random1000].state}`,
//       title: `${sample(descriptors)} ${sample(places)}`,
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae voluptate autem veniam id magni quis? Eum eaque similique necessitatibus, vitae quo corruptifacere, enim ab asperiores iusto cumque vel saepe!",
//       price: price,
//       geometry: {
//         geometry: { type: "Point", coordinates: [20.4568974, 44.8178131] },
//       },
//       images: [
//         {
//           url: "https://res.cloudinary.com/db1bojzj9/image/upload/v1691583687/YelpCamp/gyranniofgw0c4kwo7xg.jpg",
//           filename: "YelpCamp/gyranniofgw0c4kwo7xg",
//         },
//         {
//           url: "https://res.cloudinary.com/db1bojzj9/image/upload/v1691583687/YelpCamp/vygaxsybwybmo98rulu7.jpg",
//           filename: "YelpCamp/vygaxsybwybmo98rulu7",
//         },
//       ],
//     });
//     await camp.save();
//   }
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });
