const express = require('express');
const {
  GetUserData,
  DeleteUser,
  EditUser,
} = require('../controllers/userController.js');

const userRoutes = express.Router();

userRoutes.get('/', GetUserData);
userRoutes.put('/:id', EditUser);
userRoutes.delete('/:id', DeleteUser);

module.exports = userRoutes;
