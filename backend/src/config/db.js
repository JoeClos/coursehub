const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        // console.log("🚀 ~ connectDB ~ mongoUrl:", mongoUrl)

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;