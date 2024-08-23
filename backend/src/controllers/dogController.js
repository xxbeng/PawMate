// dogController.js is responsible for handling requests related to dogs
import Dog from '../models/Dog.js';
import User from '../models/User.js';

import { createDog, getDogs, getDog, updateDog, deleteDog } from '../services/dogService.js';
import { getMatchingDogs } from '../services/matchService.js';
import { calculateDistance } from '../utils/common.js';

// Create a new dog
export const create = async (req, res) => {
  try {
    const dog = await createDog(req.user._id, req.body);
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all dogs for the current user
export const getAll = async (req, res) => {
  try {
    const dogs = await getDogs(req.user._id);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific dog by ID
export const getOne = async (req, res) => {
  try {
    const dog = await getDog(req.params.id, req.user._id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a dog by ID
export const update = async (req, res) => {
  try {
    const dogData = (req?.file?.path && { ...req.body, profilePicture: req.file.path }) || req.body;
    const dog = await updateDog(req.params.id, req.user._id, dogData);
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a dog by ID
export const remove = async (req, res) => {
  try {
    await deleteDog(req.params.id, req.user._id);
    res.status(204).json({ message: 'Dog deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all dogs for other users
export const getAllOthers = async (req, res) => {
  try {
    const manualMatch = (req.query?.manualMatch?.toLowerCase() || 'false') === 'true' || false;
    const currentUser = await User.findById(req.user._id);
    const uniqueMatches = await getMatchingDogs(currentUser, manualMatch);

    const dogsWithDistance = await Promise.all(
      uniqueMatches.map(async (dog) => {
        const owner = await User.findById(dog.owner);
        const distance = calculateDistance(
          currentUser.latitude,
          currentUser.longitude,
          owner.latitude,
          owner.longitude
        );
        return { ...dog._doc, distance };
      })
    );
    res.status(200).json(dogsWithDistance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific dog by ID for other users
export const getOthers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const dogs = await Dog.find({ owner: userId });
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific dog by ID for other users
export const getOneOther = async (req, res) => {
  try {
    const userId = req.params.userId; // ID of the user who owns the dog
    const dogId = req.params.dogId; // ID of the dog to retrieve

    // Check if the specified user (dog owner) exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the dog by ID
    const dog = await Dog.findById(dogId);
    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
