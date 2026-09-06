import mongoose from 'mongoose'

const connectDb = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set. Add it to backend/.env or your host's environment variables.")
    }

    // Let the caller handle failures: the server must NOT start without a database.
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo DB Connected Successfully🎉 ")
}

export default connectDb;
