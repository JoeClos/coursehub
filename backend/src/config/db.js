// const mongoose = require('mongoose');
// require('dotenv').config();

// const mongoUrl = process.env.MONGO_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoUrl);
//         console.log("🚀 ~ connectDB ~ mongoUrl:", mongoUrl)

//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URI;

console.log("🚀 ~ connectDB ~ mongoUrl:", mongoUrl); // Add this log for debugging

const connectDB = async () => {
    try {
        if (!mongoUrl) {
            console.error("Error: MONGO_URI is not defined in the environment file.");
            process.exit(1);
        }

        await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
