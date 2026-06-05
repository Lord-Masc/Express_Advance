const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendOTP = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Task Manager",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>Email Verification</h2>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h1 style="color: #007bff; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP will expire in 10 minutes.</p>
                    <p><small>If you didn't request this, please ignore this email.</small></p>
                </div>
            `
        }
        
        const result = await transport.sendMail(mailOptions)
        return { success: true, message: "OTP sent successfully", result }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

module.exports = { transport, sendOTP, generateOTP }