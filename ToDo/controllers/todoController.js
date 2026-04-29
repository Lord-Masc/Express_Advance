// Handles request/response logic.
// Handles request → response logic

const { json } = require("body-parser")
const Todo = require("../models/todoModels")

exports.getTodos=(req,res)=>{
    res.json(Todo.getAllTodos())
}

exports.getTodo=(req,res)=>{
    const todo = Todo.getTodoById(req.params.id)
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo)
}

exports.createTodo=(req,res)=>{
    const {task} = req.body
    if(!task) return res.status(400).json({ error: "Task is required" });
 
    const newTodo = Todo.createTodo(task)
    res.status(201).json(newTodo);
}

exports.updateTodo = (req,res)=>{
     const update = Todo.updateTodo(req.params.id,req.body)
     if(!update) return  res.status(404).json({ error: "Todo not found" });
  
     res.json(update);
}

exports.deleteTodo = (req,res)=>{
    const deleted = Todo.deleteTodo(req.params.id)
    if(!deleted) return res.status(404).json({error:"Todo Not found"})
    res.json({ message: "Deleted successfully" });
}