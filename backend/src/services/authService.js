// authService.js contains the logic for registering and logging in users.
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Register a new user
export const register = async ({
  username,
  password,
  email,
  aboutMe,
  address,
  latitude,
  longitude,
  phone
}) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error('User already exists');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  // Create a new user
  const user = new User({
    username,
    password: hashedPassword,
    email,
    aboutMe,
    address,
    latitude,
    longitude,
    phone
  });
  await user.save();

  return user;
};

// Log in a user
export const login = async ({ username, password }) => {
  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return user;
};
