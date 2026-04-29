let todos = []
let id = 1

const getAllTodos = ()=>todos

const getTodoById = (id)=>{
   const todo = todos.find(t => t.id == id)
   return todo;
}
const createTodo = (task)=>{
    const newTodo = {id:id++,task,isCompleted:false}
    todos.push(newTodo)
    return newTodo
}

const updateTodo = (id,data)=>{
   const updatedTodo = todos.find(t => t.id == id)
   if (!updatedTodo) return null

   if (data.task !== undefined) updatedTodo.task = data.task;
   if (data.completed !== undefined) updatedTodo.isCompleted = data.isCompleted;
   return updatedTodo
}

const deleteTodo = (id)=>{
    const todo = todos.find(t=> t.id==id)
    if(!todo) return false

    todos.splice(todos.indexOf(todo),1)
    return true
}

module.exports = {
    getAllTodos, getTodoById , createTodo ,updateTodo ,deleteTodo
}