const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).render("register", {
            error: "An account with this email already exists.",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    res.redirect("/login");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).render("login", {
            error: "User not found.",
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).render("login", {
            error: "Wrong password.",
        });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/todos");
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};
