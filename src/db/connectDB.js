import mongoose from "mongoose";
const {    MONGODB_URI= "mongodb://localhost:27017/c18" } = process.env;
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("connected", conn);
      
        // this is for errors after a connection has been established
        mongoose.connection.on("error", (err) => {
          console.log(err);
        });
      } catch (error) {
        // this is for connection error
        console.log(error);
      }    
}

export default connectDB;