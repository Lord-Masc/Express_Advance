const express = require("express");
const router = express.Router();
const todo = require("../controller/todoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, todo.getTodo);
router.post("/add", authMiddleware, todo.createTodo);
router.get("/delete/:id", authMiddleware, todo.deleteTodo);

module.exports = router;
