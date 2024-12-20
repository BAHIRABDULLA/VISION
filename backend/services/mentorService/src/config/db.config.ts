import mongoose from "mongoose";

 const connectDb = async()=>{
    try {
        const connectionString   = process.env.MONGO_URI
        if(!connectionString ){
            console.log('cannot get connectionString ');
            return
        }
        await mongoose.connect(connectionString )
        
    } catch (error) {
        console.error('Error founded in connect mongodb',error);
    }
}
export default connectDb