const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables.');
        }

        // Connecting to MongoDB (no need for useNewUrlParser or useUnifiedTopology)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);  // Exit with failure status
    }
}

module.exports = connectDB;
