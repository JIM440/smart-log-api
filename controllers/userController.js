const User = require('../models/User.js');

const GetUserData = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found!' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const EditUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    // Update user details
    const userDetails = req.body;
    await userExists.update(userDetails);

    res
      .status(200)
      .json({ message: 'User updated successfully!', user: userExists });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    // Delete the user
    await userExists.destroy();

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { GetUserData, EditUser, DeleteUser };
