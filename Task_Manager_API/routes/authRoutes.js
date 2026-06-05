const express = require("express")

const {register,login, sendOtpEmail, verifyOTP} = require("../controllers/authController")
const { registerValidator } = require("../validator/authValidator")
const { validate } = require("../middleware/validationMiddleware")
const authLimit = require("../middleware/rateLimitatMiddleware")

const router = express.Router()

router.post("/register",authLimit, registerValidator,validate, register)
router.post("/login",authLimit,login)
router.post("/send-otp",authLimit, sendOtpEmail)
router.post("/verify-otp", verifyOTP)

module.exports = router
