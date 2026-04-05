import mongoose from 'mongoose'

const connectDB = async () => {
    const mongodb_uri = process.env.MONGODB_URI;

    try{
        await mongoose.connect(mongodb_uri);
        console.log("Database connection established");
    }catch(e){
        console.log("error establishing connection with database "+e);
    }
}

export default connectDB;