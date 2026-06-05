const {body} = require("express-validator")

const createValidator = [
    body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({min:4})
    .withMessage("Title must be at least 4 characters"),

    body("description")
    .optional()
    .isLength({min:5})
    .withMessage("Description must be at least 5 characters")
]

module.exports = { createValidator }