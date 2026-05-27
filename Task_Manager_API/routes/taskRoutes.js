const express = require("express")

const router = express.Router()

const {getTask,createTask} = require("../controllers/taskController")
const protect = require('../middleware/authMiddleware')
const { createValidator } = require("../validator/taskValidator")
const { validate } = require("../models/userModel")


router.get("/",protect,getTask)
router.post("/",protect,createValidator,validate,createTask)
module.exports = router