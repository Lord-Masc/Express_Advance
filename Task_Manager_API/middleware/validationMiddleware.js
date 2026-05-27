const {validationResult} = require("express-validator")

exports.validate = (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty){
        return res.status(400).json({
            sucess:false,
            error:error.array
        })
    }
    next()
}