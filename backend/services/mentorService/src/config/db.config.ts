import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        const mongoUri = process.env.MONGOOSE_URI || 'mongodb://localhost:27017/vision_mentors'
        await mongoose.connect(mongoUri)
        
    } catch (error) {
        console.error('Error founded in connect mongodb',error);
    }
}
export default connectDb