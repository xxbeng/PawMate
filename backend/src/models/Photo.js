// Initialize Photo model
import mongoose from 'mongoose';

// Photo schema
const PhotoSchema = new mongoose.Schema({
  dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', required: true },
  url: { type: String, required: true }
});

// Initialize Photo model
const PhotoModel = mongoose.model('Photo', PhotoSchema);
export default PhotoModel;
