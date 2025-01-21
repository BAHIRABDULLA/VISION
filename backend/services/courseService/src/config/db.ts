import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const connectionString = process.env.MONGO_URI
        if (!connectionString) {
            return
        }
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000, 
        });
        
        console.log('mongodb connected');
    } catch (error) {
        console.error('Error founded in connecting db', error);
    }
}