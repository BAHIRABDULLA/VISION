import mongoose from "mongoose"

export const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/vision_course')
        console.log('mongodb connected');
    } catch (error) {
        console.error('Error founded in connecting db',error);
    }
}