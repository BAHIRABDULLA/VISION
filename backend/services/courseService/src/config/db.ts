import mongoose from "mongoose"

export const connectDb = async()=>{
    try {
        const mongo_uri  = process.env.MONGO_URI
        if(!mongo_uri){
            console.log('cannot get mongo_uri');
            return
        }
        await mongoose.connect(mongo_uri)
        console.log('mongodb connected');
    } catch (error) {
        console.error('Error founded in connecting db',error);
    }
}