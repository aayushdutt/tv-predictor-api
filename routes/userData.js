var express = require("express");
var router = express.Router();
var db = require("../models");

/* GET user data. */
router.post("/find", function(req, res, next) {
  let img = req.body.img;

  // send the image to API and find which one matches
  let id = ""; // fill it with id
  db.UserData.find({ __id: id })
    .then(function(userData) {
      if (userData.length === 0) {
        return res.json({ err: "couldn't find any user" });
      }
      return res.json(userData);
    })
    .catch(function(err) {
      return res.send(err);
    });
});

/* POST user data. */
router.post("/create", function(req, res, next) {
  let data = req.body.data;

  db.UserData.create(data)
    .then(function(msg) {
      return res.json({ success: true });
    })
    .catch(function(err) {
      res.json({ success: false });
    });
});

module.exports = router;
