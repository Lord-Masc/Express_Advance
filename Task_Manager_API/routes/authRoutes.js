const express = require("express")

const {register,login} = require("../controllers/authController")
const { registerValidator } = require("../validator/authValidator")
const { validate } = require("../models/userModel")

const router = express.Router()

router.post("/register", registerValidator,validate, register)
router.post("/login",login)

module.exports = router
