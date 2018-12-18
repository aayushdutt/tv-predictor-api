var express = require('express');
var router = express.Router();
var db = require('../models');


/* GET root data {returns all medicines}. */
router.get('/', function(req, res, next) {
  console.log("got index")
  db.MedData.find()
    .then(function(posts) {
      posts = posts.reverse();
      res.json(posts);
    })
    .catch(function(err) {
        res.send(err);
  })
});

module.exports = router;
