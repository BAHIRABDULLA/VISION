import mongoose from "mongoose"

export const connectDb = async()=>{
    try {
        const connectionString   = process.env.MONGO_URI
        if(!connectionString ){
            console.log('cannot get connectionString ');
            return
        }
        await mongoose.connect(connectionString )
        console.log('mongodb connected');
    } catch (error) {
        console.error('Error founded in connecting db',error);
    }
}