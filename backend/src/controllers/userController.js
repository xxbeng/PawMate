// userController.js contains the logic for the user routes
import { getUserByUsername, updateUserByUsername } from '../services/userService.js';

// Get a user by username
export const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by username
export const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await updateUserByUsername(username, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
