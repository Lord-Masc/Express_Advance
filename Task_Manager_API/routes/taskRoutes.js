const express = require("express")

const router = express.Router()

const {getTask} = require("../controllers/taskController")
const protect = require('../middleware/authMiddleware')

router.get("/",protect,getTask)
module.exports = router