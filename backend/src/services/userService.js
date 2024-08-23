// userService.js contains the logic for updating and getting user data.
import User from '../models/User.js';

// Get user by username
export const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  return user;
};

// Update user by username
export const updateUserByUsername = async (username, userdata) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  user.email = userdata.email;
  user.address = userdata.address;
  user.phone = userdata.phone;
  user.latitude = Number(userdata.latitude);
  user.longitude = Number(userdata.longitude);
  user.aboutMe = userdata.aboutMe;
  console.log(userdata);
  user.save();
  return user;
};
