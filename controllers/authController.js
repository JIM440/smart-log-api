const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    // Send response with token and user details
    res.status(200).json({
      message: 'Login Successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Register = async (req, res) => {
  try {
    const { name, email, password, gender, isAdmin } = req.body;
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
      isAdmin,
    });

    // Create JWT token for the user after they are created
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' } // token expiration
    );

    // Send response with token and user details
    res.status(200).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        isAdmin: user.isAdmin,
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
    // Extract the Bearer token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Using Authorization header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // If the error is due to token expiration
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
      }

      return res.status(200).json({ message: 'Token is valid', user: decoded });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  Login,
  Register,
  Logout,
  ValidateToken,
};
