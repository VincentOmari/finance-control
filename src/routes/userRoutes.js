const express = require('express');
const { registerUser, fetchUsersCtrl } = require('../controllers/users/usersCtrl');
const userRoutes = express.Router(); // Changed from userRoute to userRoutes

// Define routes and handlers
userRoutes.post('/register', registerUser); // Corrected to userRoutes
userRoutes.get('/users', fetchUsersCtrl); // Corrected to userRoutes and changed to GET request for fetching users

module.exports = userRoutes;
