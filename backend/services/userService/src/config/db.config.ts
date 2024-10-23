import mongoose from "mongoose";


const connectMongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vision_user')
    } catch (error) {
        console.error('failed to connect database',error)
    }
}

export default connectMongodb