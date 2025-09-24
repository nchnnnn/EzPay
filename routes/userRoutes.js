const express = require('express');
const route = express.Router();
const userController = require('../controller/userController.js')


//User CRUD routes

route.get("/users", userController.getUsers); // Admin Only, can search all users
route.get("/:id", userController.getUser); // Current user finding a valid user to send balace
route.put("/:id", userController.updateUser); // User want to change the profile infomartion
route.delete("/:id", userController.deactiveUser) // Disable or Deactive Account by User

module.exports = route;
