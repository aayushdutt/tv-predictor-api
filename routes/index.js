var express = require("express");
var router = express.Router();
var db = require("../models");

/* GET root data {returns all medicines}. */
router.get("/", function(req, res, next) {
  console.log("got index");
  res.send("Hello World!");
});

module.exports = router;
