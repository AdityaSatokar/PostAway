import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URL = process.env.DBURL || "mongodb://localhost:27017/postaway";
const connectToDB=async()=>{
    try{
        await mongoose.connect(URL);
        console.log("connected to mongoDB!");
    }catch(err){
        console.log(err);
        console.log("encountered an error while connecting to database!");
    }
}

export default connectToDB;