const Task = require("../models/taskModel");
const { asyncHandler } = require("../utils/asyncHandler");

const getTask = asyncHandler(
    async (req,res)=>{
        const task = await Task.findById(req.params.id)
        if (!task) {
           throw new apiError(
            404,
            "Task not found"
           )
        }
        res.json(task)
    }
)
const createTask = asyncHandler(
    async (req,res)=>{
        const task = Task.create({
             title:req.body.title,
             description:req.body.description,
             createdBy:req.body.id
        })
        res.status(201).json(task)
    }
)
module.exports = {getTask,createTask}
