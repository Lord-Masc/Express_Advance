const express = require("express")

const {register,login} = require("../controllers/authController")
const { registerValidator } = require("../validator/authValidator")
const { validate } = require("../middleware/validationMiddleware")
const authLimit = require("../middleware/rateLimitatMiddleware")

const router = express.Router()

router.post("/register",authLimit, registerValidator,validate, register)
router.post("/login",authLimit,login)

module.exports = router
