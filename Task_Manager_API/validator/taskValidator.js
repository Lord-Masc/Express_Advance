const {body} = require("express-validator")

exports.createValidator = [
    body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({min:4})
    .withMessage("Title must be 4 letter"),

    body("description")
    .optional()
    .isLength({min:5})
    .withMessage("Description must be require at least 5 character")
]