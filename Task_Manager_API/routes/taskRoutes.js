const express = require("express")

const router = express.Router()

const {getTask,createTask,updateTask,deleteTask} = require("../controllers/taskController")
const protect = require('../middleware/authMiddleware')
const { createValidator } = require("../validator/taskValidator")
const { validate } = require("../middleware/validationMiddleware")


router.get("/",protect,getTask)
router.post("/",protect,createValidator,validate,createTask)
router.put("/:id",protect,updateTask)
router.delete("/:id",protect,deleteTask)

module.exports = router