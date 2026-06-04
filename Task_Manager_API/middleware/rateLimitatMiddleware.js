const rateLimit = require("express-rate-limit")

const authLimit = rateLimit({
    windowMs:15*60*1000,
    min:5,
    message:{
        sucess:false,
        message:"To many times resquest"
    }
})

module.exports = authLimit