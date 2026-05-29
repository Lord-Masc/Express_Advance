const {body} = require("express-validator")

exports.registerValidator=[
    body("name")
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
    .isEmail()
    .withMessage("Email is required"),

    body("password")
    .isLength({min:6})
    .withMessage("Password must be required")
]