// Initialize User model
import mongoose from 'mongoose';

// User schema
const UserSchema = new mongoose.Schema({
  aboutMe: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  phone: { type: String, required: false },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
  likeMe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
  dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
  photoProfile: { type: String, required: false }
});

// Initialize User model
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
