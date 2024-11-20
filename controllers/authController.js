const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login Function
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // set to true if using HTTPS
      secure: false, // set to true if using HTTPS
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Send response with token and user details
    res.status(200).json({
      message: 'Login Successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    // check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // create new user
    const user = await User.create({
      name,
      email,
      password,
      gender,
    });

    // Create JWT token for the user after they are created
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' } // token expiration
    );

    // Set cookie with token
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // set to true if using HTTPS
      secure: false, // set to true if using HTTPS
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Send response with token and user details
    res.status(200).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: false });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const ValidateToken = async (req, res) => {
  try {
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Servere Error' });
  }
};

module.exports = {
  Login,
  Register,
  Logout,
  ValidateToken,
};
