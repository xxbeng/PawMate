// Connect to MongoDB database using mongoose.
import mongoose from 'mongoose';

// Connect to MongoDB database using mongoose, and log the status of the connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

export default connectDB;
