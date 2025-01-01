import mongoose from "mongoose";


const connectMongodb = async () => {
    try {
        const connectionString   = process.env.MONGO_URI
        console.log(connectionString,'connection string in user service');
        
        if(!connectionString ){
            console.log('cannot get connectionString ');
            return
        }
        await mongoose.connect(connectionString )
    } catch (error) {
        console.error('failed to connect database',error)
    }
}

export default connectMongodb