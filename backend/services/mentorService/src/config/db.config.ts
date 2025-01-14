import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        const connectionString   = process.env.MONGO_URI
        if(!connectionString ){
            console.log('cannot get connectionString ');
            return
        }
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000, 
        });
        
    } catch (error) {
        console.error('Error founded in connect mongodb',error);
    }
}
export default connectDb