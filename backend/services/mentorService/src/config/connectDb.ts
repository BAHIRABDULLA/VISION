import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        const mongoUri = process.env.MONGOOSE_URI || 'mongodb://localhost:27017/vision_mentors'
        console.log(process.env.MONGOOSE_URI,'process.env.MONGOOSE_URI');
        
        const connect =await mongoose.connect(mongoUri)
        console.log('Mongodb connected:');
        
    } catch (error) {
        console.error('Error founded in connect mongodb',error);
        
    }
}
export default connectDb