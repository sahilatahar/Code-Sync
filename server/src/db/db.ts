import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.BACKEND_URL as string);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
