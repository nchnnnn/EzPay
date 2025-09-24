const express = require('express');
const route = express.Router();
const authController = require('../controller/authController.js')

const { authenticateToken } = require('../middleware/auth.js');

route.post('/register', authController.register);

module.exports = route;