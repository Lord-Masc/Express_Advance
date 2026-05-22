const express = require('express');
const cors = require("cors")
const helmet = require("helmet") // For  Basic Security
const morgan = require("morgan") // For logs

const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/auth", authRoutes);

module.exports = app

