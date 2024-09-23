import mongoose from "mongoose";


const connectMongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/')
        console.log('mongodb connected');
    } catch (error) {
        console.log('failed to connect database',error)
        
    }
}

export default connectMongodb