const express = require("express")
const dotDev = require("dotenv")
const connectDB = require("./config/db")
const app = express()

dotDev.config()
connectDB()

app.use(express.json())
app.use("/api/todos",require("./routes/todoRoutes"))

app.listen(5000, () => {
    console.log("Server running on port 5000");
});