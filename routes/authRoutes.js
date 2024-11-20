const express = require('express');
const {
  Login,
  Register,
  Logout,
  ValidateToken,
} = require('../controllers/authController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

const authRoutes = express.Router();

// auth
authRoutes.post('/login', Login);
authRoutes.post('/register', Register);
authRoutes.post('/logout', Logout);
// validate token
authRoutes.get('/validate-token', authMiddleware, ValidateToken);

module.exports = authRoutes;
