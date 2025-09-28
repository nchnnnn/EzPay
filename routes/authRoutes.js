const express = require('express');
const route = express.Router();
const authController = require('../controller/authController.js')
const { authenticateToken } = require('../middleware/auth.js');

route.post('/register', authController.register);

route.post('/login', authController.login);

// Get user Data
route.get('/profile', authenticateToken, authController.getProfile);
// Update user Data
route.put('/profile', authenticateToken, authController.updateProfile);
route.post('/change-password', authenticateToken, authController.changePassword);
route.post('/logout', authenticateToken, authController.logout);




module.exports = route;