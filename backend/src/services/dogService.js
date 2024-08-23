//dogService.js contains the functions for creating, getting, updating, and deleting dogs. These functions are used in the dog controller to handle the dog-related requests from the frontend.
import Dog from '../models/Dog.js';
import User from '../models/User.js';

// Create a new dog
export const createDog = async (owner, { name, breed, dob, gender, weight, bio, neutered }) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = new Dog({ name, breed, dob, owner, gender, weight, bio, neutered });
  await dog.save();

  user.dogs.push(dog._id);
  await user.save();

  return dog;
};

// Get all dogs for a specific user
export const getDogs = async (owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  return await Dog.find({ owner });
};

// Get a specific dog by ID
export const getDog = async (id, owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOne({ _id: id, owner }).populate('photos');
  if (!dog) throw new Error('Dog not found');

  return dog;
};

// Update a dog by ID
export const updateDog = async (id, owner, data) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOneAndUpdate({ _id: id, owner }, data, { new: true });
  if (!dog) throw new Error('Dog not found');

  if (data.profilePicture) {
    dog.profilePicture = data.profilePicture;
    await dog.save();
  }

  return dog;
};

// Delete a dog by ID
export const deleteDog = async (id, owner) => {
  const user = await User.findById(owner);
  if (!user) throw new Error('User not found');

  const dog = await Dog.findOneAndDelete({ _id: id, owner });
  if (!dog) throw new Error('Dog not found');

  return dog;
};
