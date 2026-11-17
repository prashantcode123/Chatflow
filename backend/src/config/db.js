import mongoose from "mongoose";

export async function connectToDB() {
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
    }catch(err){
        console.log('mongoose error : ', err.message)
    }
}