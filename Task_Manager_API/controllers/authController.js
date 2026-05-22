const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/userModel");

const resgister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await user.findOne({ email })
        if (email) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            sucess: true,
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!email) {
            return res.status(401).json({
                message: "Invalid Cradential"
            })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invaid Cradential"
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        res.json({
            token
        })

    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}

module.exports = {resgister,login}