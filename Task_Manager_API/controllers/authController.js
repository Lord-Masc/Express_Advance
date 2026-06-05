const bcrypt = require("bcryptjs")

const User = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../services/tokenServices");
const { sendOTP, generateOTP } = require("../services/emailService");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
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
        if (!user) {
            return res.status(401).json({
                message: "Invalid Credential"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credential"
            })
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        res.json({
            success: true,
            accessToken,
            refreshToken
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const sendOtpEmail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const otp = generateOTP()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        await User.findByIdAndUpdate(user._id, { otp, otpExpiry })

        const result = await sendOTP(email, otp)
        if (result.success) {
            res.json({
                success: true,
                message: "OTP sent to your email"
            })
        } else {
            res.status(500).json({
                success: false,
                message: result.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: "OTP has expired" })
        }

        await User.findByIdAndUpdate(user._id, {
            otp: null,
            otpExpiry: null,
            isVerified: true
        })

        res.json({
            success: true,
            message: "Email verified successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { register, login, sendOtpEmail, verifyOTP }
