const express = require("express")
const router = express.Router();
const auth = require("../controller/authController")

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/login",auth.getLogin)
router.get("/register",auth.getRegister)

router.post("/register",auth.register)
router.post("/login",auth.login)

router.get("/logout",auth.logout)

module.exports = router
