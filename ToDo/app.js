// All middlewares + routes connected here.
const express = require('express')
const app = express();

const todoRoutes = require("./routes/todoRouters");
const logger = require("./middlewares/todoMiddleware");

app.use(express.json());
app.use(logger);

app.use("./todos",todoRoutes);

module.exports = app
