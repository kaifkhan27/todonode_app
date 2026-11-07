import mongoose from "mongoose";
export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");

    }catch(error){
        console.log("Error in DB connection", error);
        console.error(error.message);
        process.exit(1);
    }
    
}