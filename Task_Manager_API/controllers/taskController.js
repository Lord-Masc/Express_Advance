const getTask = async (req,res,next)=>{
    res.json({
        message:"Protected Task Routes",
        user:req.user
    })
}
module.exports = getTask
