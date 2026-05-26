const Task = require("../models/taskModel")

const getTask = async (req,res,next)=>{
    res.json({
        message:"Protected Task Routes",
        user:req.user
    })
}
const createTask = async (req,res)=>{
    const task = await Task.create({
        title:req.body.title,
        description = req.body.description,
        createdBy=req.user.id
    })
    res.status(201).json(task);
}
module.exports = {getTask,createTask}
