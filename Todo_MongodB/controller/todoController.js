const Todo = require("../model/Todo")

exports.createTodo = async (req,res)=>{
    try{
        const todo = await Todo.create(req.body)
        res.status(201).json(todo)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.getTodos =async (req,res)=>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.updateTodo = async (req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.json(todo)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

exports.deleteTodo = async (req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.json({message:"Deleted Sucessfully"})
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}
