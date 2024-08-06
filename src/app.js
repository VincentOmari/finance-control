const express = require('express');
const dotenv = require("dotenv");
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes'); // Import the router
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();
//env
dotenv.config();
// Connect to the database
dbConnect();

// Middleware to parse JSON
app.use(express.json());

// Use the router for '/api'
app.use('/api', userRoutes); // Adjusted to use '/api' base path

// Error handling middleware
app.use(notFound); // This will handle routes that are not matched
app.use(errorHandler); // This will handle errors

module.exports = app;
