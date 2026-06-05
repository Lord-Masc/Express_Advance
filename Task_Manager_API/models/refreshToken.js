const mongoose =  require("mongoose")

const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    token:{
        type:String,
        reuire:true
    },
    expressAt:{
        type:Date,
        require:true
    }
})

module.exports = mongoose.model("RefreshToken",refreshTokenSchema)