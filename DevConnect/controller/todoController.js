const Todo = require("../models/Todo")

exports.getTodo = async (req,res)=>{
    const todos = await Todo.find({userId:req.user.id})
    res.render("dashboard",{todos})
}
exports.createTodo = async (req,res)=>{
    const title = req.body.title?.trim();
    if (!title) {
        return res.redirect("/todos");
    }

    await Todo.create({
        title,
        userId:req.user.id
    })
    res.redirect("/todos")
}
exports.deleteTodo = async (req,res)=>{
    await Todo.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
    })
    res.redirect("/todos")
}
