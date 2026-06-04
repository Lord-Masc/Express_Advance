const Task = require("../models/taskModel");
const { asyncHandler } = require("../utils/asyncHandler");
const apiError = require("../utils/apiError")

const getTask = asyncHandler(
    async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.search || ""
        const status = req.query.status || ""
        const sort = req.query.sort || "-createdAt";
        const priority = req.query.priority || ""

        const skip = (page - 1) * limit

        const query = {
            createdBy: req.user.id
        };
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        // FILTER STATUS

        if (status) {
            query.status = status;
        }

        // FILTER PRIORITY

        if (priority) {
            query.priority = priority;
        }

        // DATABASE QUERY

        const tasks =
            await Task.find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit);

        // TOTAL DOCUMENTS

        const total =
            await Task.countDocuments(
                query
            );

        res.json({
            success: true,
            currentPage: page,
            totalPages:
                Math.ceil(total / limit),
            totalTasks: total,
            count: tasks.length,
            data: tasks
        });
    }

)
const createTask = asyncHandler(
    async (req, res) => {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.user.id
        })
        res.status(201).json(task)
    }
)

const updateTask = asyncHandler(
    async (req,res) =>{
        const task = await Task.findOne({
            _id:req.params.id,
            createdBy:req.user.id
        })
        if(!task){
            throw new apiError(
                404,
                "Task Not found"
            )
        }
        Object.assign(task,req.body)

        await task.save()
        res.json({
            success: true,
            data: task
        });
    }
)
const deleteTask = asyncHandler(
    async(req,res)=>{
        const task = await Task.findOne({
            _id:req.params.id,
            createdBy:req.user.id
        })
        if(!task){
            throw new apiError(
                404,
                "No Task Found"
            )
        }
        await task.deleteOne()
        res.json({
            success: true,
            message: 
            "Task deleted successfully"
        });
    }
)
module.exports = { getTask, createTask ,updateTask , deleteTask }
