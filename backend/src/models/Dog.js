// Initialize Dog model
import mongoose from 'mongoose';

// Dog schema
const DogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    dob: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    bio: { type: String, required: true },
    neutered: { type: Boolean, required: true },
    profilePicture: { type: String, required: false },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property to calculate the age of the dog
DogSchema.virtual('age').get(function () {
  const diff = Date.now() - this.dob.getTime();
  const ageInMilliseconds = new Date(diff);
  return Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
});

// Initialize Dog model
const DogModel = mongoose.model('Dog', DogSchema);
export default DogModel;
