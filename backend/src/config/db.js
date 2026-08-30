import mongoose from 'mongoose'

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB Connected Successfully")
    } catch (error) {
        console.error("Error occur",error);
    }
}

export default connectDb;