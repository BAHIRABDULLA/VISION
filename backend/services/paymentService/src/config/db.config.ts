import mongoose from "mongoose";


const connectMongodb = async () => {
    try {
        const mongo_uri  = process.env.MONGO_URI
        if(!mongo_uri){
            console.log('cannot get mongo_uri');
            return
        }
        await mongoose.connect(mongo_uri)
    } catch (error) {
        console.error('failed to connect database',error)
    }
}

export default connectMongodb