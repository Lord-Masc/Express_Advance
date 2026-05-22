const express = require('express');
const cors = require("cors")
const helmet = require("helmet") // For  Basic Security
const morgan = require("morgan") // For logs

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.get("/",(req,res)=>{
    res.send("Task Manager API Running")
})

module.exports = app

