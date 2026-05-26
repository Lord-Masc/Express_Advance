const express = require("express")

const router = express.Router()

const {getTask,createTask} = require("../controllers/taskController")
const protect = require('../middleware/authMiddleware')


router.get("/",protect,getTask)
router.post("/",protect,createTask)
module.exports = router