const mongoose = require("mongoose")
const { timeStamp } = require("node:console")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    role:{
       type:String,
       enum:["User","Admin"],
       default:"User"
    },
    

},{ timeStamp:true})

module.exports = mongoose.model("User",userSchema)