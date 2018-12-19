var express = require("express");
var router = express.Router();
var axios = require("axios");
var request = require("request");
var db = require("../models");
var keys = require("../config/keys");
var { cloudinaryConfiguration, faceAPIKey } = keys;

const GENERATE_ID_URL =
  "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
const MATCH_ID_URL =
  "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/findsimilars";

// HELPERS
function generateId(imgUrl, callback) {
  let headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": faceAPIKey
  };

  var options = {
    method: "POST",
    url: GENERATE_ID_URL,
    body: JSON.stringify({ url: imgUrl }),
    headers
  };

  request(options, function(err, response, body) {
    // SENDS REQUEST TO CREATE ID
    if (!err) {
      var info = JSON.parse(body);
      console.log("successfully created faceId", info);
      return callback(info[0].faceId);
    } else {
      console.log("unsuccessful attempt to create ID");
      console.log(err);
    }
  });
}

// ------------------ROUTES------------------
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
  let data = { ...req.body };
  let imgUrl =
    "https://cdn.images.express.co.uk/img/dynamic/galleries/x701/389530.jpg";

  let bodyData = { url: imgUrl };

  generateId(imgUrl, function(faceId) {
    data.faceId = faceId;
    db.UserData.create(data)
      .then(function(newData) {
        // STORE USER DATA WITH ID
        console.log(newData);
        return res.json(newData);
      })
      .catch(function(err) {
        return res.json({ success: false });
      });
  });
});

module.exports = router;
