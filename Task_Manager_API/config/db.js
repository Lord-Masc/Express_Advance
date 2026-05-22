const mongoose = require("mongoose");
const { log } = require("node:console");

const connectDB = async ()=>{
   try{
     await mongoose.connect(process.env.MONGO_URI)
     console.log("Database Connected");
     
   } catch(e){
    console.log(e.message);
    process.exit(1)
   }
}

module.exports = connectDB;