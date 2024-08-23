// photoService contains the logic for photo operations
import Dog from '../models/Dog.js';
import Photo from '../models/Photo.js';

// Create a new photo
export const createPhoto = async (dog, url) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  const dogPhoto = new Photo({ dog, url });
  await dogPhoto.save();

  dogExists.photos.push(dogPhoto._id);
  await dogExists.save();

  return dogPhoto;
};

// Get all photos for a specific dog
export const getPhotos = async (dog) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  return await Photo.find({ dog });
};

// Delete a photo by ID
export const deletePhoto = async (dog, _id) => {
  const dogExists = await Dog.findById(dog);
  if (!dogExists) throw new Error('Dog not found');

  const photo = await Photo.findOneAndDelete({ _id, dog });
  if (!photo) throw new Error('Photo not found');

  return photo;
};
