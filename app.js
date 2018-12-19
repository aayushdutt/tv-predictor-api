var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
var userDataRouter = require("./routes/userData");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api", userDataRouter);

module.exports = app;
