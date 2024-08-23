// matchesService.js contains the logic for creating a match between two dogs, getting friends with dogs, getting all dogs except the user, getting matching dogs, and unfriending a user.
import Dog from '../models/Dog.js';
import User from '../models/User.js';
import { dogGroups } from './dogGroupsData.js';

// Create a match between two dogs
export const createMatch = async (currentUserId, otherDogId) => {
  // Find the current user and the other dog
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error('User not found');
  const otherDog = await Dog.findById(otherDogId).populate('owner');
  if (!otherDog) throw new Error('Dog not found');

  // Check if the current user is the owner of the other dog
  if (currentUser.equals(otherDog.owner._id)) throw new Error('Cannot match with your own dog');
  if (currentUser.friends.includes(otherDog.owner._id)) return 'Match created';

  // Find the owner of the other dog
  const otherDogOwner = otherDog.owner;
  if (!otherDogOwner) throw new Error('Owner of the dog not found');

  // Check if the current user and the other dog owner already like each other
  if (otherDogOwner.like.includes(currentUserId)) {
    otherDogOwner.like = otherDogOwner.like.filter((id) => !id.equals(currentUserId));
    currentUser.likeMe = currentUser.like.filter((id) => !id.equals(otherDogOwner._id));

    // Add each other to friends list
    if (!currentUser.friends.includes(otherDogOwner._id)) {
      currentUser.friends.push(otherDogOwner._id);
    }

    // Add each other to friends list
    if (!otherDogOwner.friends.includes(currentUserId)) {
      otherDogOwner.friends.push(currentUserId);
    }

    await currentUser.save();
    await otherDogOwner.save();
  } else {
    otherDogOwner.likeMe.push(currentUserId);
    currentUser.like.push(otherDogOwner._id);
    await otherDogOwner.save();
    await currentUser.save();
    return 'Match created';
  }
};

// Get friends with dogs
export const getFriendsWithDogs = async (currentUserId) => {
  // Find the current user
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error('User not found');

  // Populate friends with dogs
  const populatedUser = await User.findById(currentUserId).populate({
    path: 'friends',
    model: 'User',
    select: '-password -like -likeMe -friends -latitude -longitude',
    populate: {
      path: 'dogs',
      model: 'Dog'
    }
  });

  return populatedUser.friends;
};

// Get all dogs except the user
export const getAllDogsExceptUser = async (currentUserId) => {
  const user = await User.findById(currentUserId);
  if (!user) throw new Error('User not found');
  const friendsIds = user.friends.map(({ _id }) => _id);
  const excludeOwners = [currentUserId, ...friendsIds];
  return await Dog.find({ owner: { $nin: excludeOwners } });
};

// Find group by breed
function findGroupByBreed(breed, groups) {
  for (const group in groups) {
    if (groups[group].includes(breed)) {
      return group;
    }
  }
  return null;
}

// Get matching dogs
export const getMatchingDogs = async (currentUser, manualMatch = false) => {
  // Find the current user's dogs and all other dogs
  const userDogs = await Dog.find({ owner: currentUser._id });
  const allOtherDogs = await getAllDogsExceptUser(currentUser._id);

  // Cache dog groups
  const dogGroupCache = new Map();
  const getDogGroups = (dog) => {
    if (!dogGroupCache.has(dog._id.toString())) {
      dogGroupCache.set(dog._id.toString(), {
        sizeGroup: findGroupByBreed(dog.breed, dogGroups.dogSizeGroups),
        temperamentGroup: findGroupByBreed(dog.breed, dogGroups.dogTemperamentGroups)
      });
    }
    return dogGroupCache.get(dog._id.toString());
  };

  // Find matches for the current user's dogs
  const flatMatches = (manualMatch && allOtherDogs) || [];
  if (!manualMatch) {
    let matchesForUserDogs = userDogs.map((userDog) => {
      // Get the size and temperament group for the user's dog
      const { sizeGroup: userSizeGroup, temperamentGroup: userTempGroup } = getDogGroups(userDog);

      // Find all other dogs that match the user's dog
      const matches = allOtherDogs.filter((otherDog) => {
        const { sizeGroup: otherSizeGroup, temperamentGroup: otherTempGroup } =
          getDogGroups(otherDog);
        return userSizeGroup === otherSizeGroup && userTempGroup === otherTempGroup;
      });
      // Return the user's dog and its matches
      return { dog: userDog, matches };
    });
    // Flatten the matches array
    matchesForUserDogs.forEach((item) => flatMatches.push(...item.matches));
  }

  // Remove duplicates from the matches array
  return Array.from(new Set(flatMatches.map((dog) => dog._id.toString()))).map((id) =>
    flatMatches.find((dog) => dog._id.toString() === id)
  );
};

// Unfriend a user
export const unfriendUser = async (currentUserId, friendId) => {
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) throw new Error('Current user not found');
  const friend = await User.findById(friendId);
  if (!friend) throw new Error('Friend user not found');
  currentUser.friends.pull(friendId);
  await currentUser.save();
  friend.friends.pull(currentUserId);
  await friend.save();
  return { message: 'Friend removed successfully' };
};
