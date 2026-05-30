const express = require("express")

const protect = require("../middleware/authMiddleware")
const authorize = require("../middleware/roleMiddleware")

const router = express.Router()

router.get("/admin",protect,authorize("admin"),(req,res)=>{
    res.json({
        message:"Admin DashBoard"
    })
})
module.exports = router