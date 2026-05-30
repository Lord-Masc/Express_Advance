const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        if (!token) {
            return res.status(401).json({ message: "No Token found" })
        }
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decode
        next()
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}
module.exports = protect