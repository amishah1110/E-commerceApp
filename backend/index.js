// entry point for backend folder 
const express = require("express");
const cors = require("cors");
require('dotenv')
const connectDB = require('./config/db');
const router = require('./routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

connectDB().then(()=>{
    console.log("Connected to MongoDB");
    console.log("Server is running");

})
const PORT = 5000||process.env.PORT;
app.listen(PORT)