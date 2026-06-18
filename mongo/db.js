import { config, configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv()

const MONGO_URI = process.env.MONGO_URI
export const db =async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}
