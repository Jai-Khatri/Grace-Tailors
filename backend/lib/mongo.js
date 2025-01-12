import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const ConnnectToDB = async() => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB server: " , conn.connection.host)
}

export default ConnnectToDB();