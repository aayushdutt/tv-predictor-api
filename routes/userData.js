var express = require("express");
var router = express.Router();
var request = require("request");
var db = require("../models");
var keys = require("../config/keys");
var { faceAPIKey } = keys;

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

function getMatchingId(faceId, faceIds, callback) {
  let headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": faceAPIKey
  };

  let requestBody = {
    faceId,
    faceIds,
    maxNumOfCandidatesReturned: 1
  };

  var options = {
    method: "POST",
    url: MATCH_ID_URL,
    body: JSON.stringify(requestBody),
    headers
  };

  request(options, function(err, response, body) {
    // SENDS REQUEST TO CREATE ID
    if (!err) {
      var info = JSON.parse(body);
      console.log("Info is: ", info);
      return callback(info[0].faceId);
    } else {
      console.log("unsuccessful attempt to match ID");
      console.log(err);
    }
  });
}

// ------------------ROUTES------------------
/* GET user data. */
router.post("/find", function(req, res, next) {
  let imgUrl =
    "https://cdn.images.express.co.uk/img/dynamic/galleries/x701/389530.jpg";

  generateId(imgUrl, function(currFaceId) {
    db.UserData.find()
      .then(allUsers => {
        let faceIds = [];
        allUsers.forEach(user => {
          faceIds.push(user.faceId);
        });
        console.log(faceIds);

        getMatchingId(currFaceId, faceIds, function(matchingId) {
          db.UserData.findOne({ faceId: matchingId })
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  });
});

/* POST user data. */
router.post("/create", function(req, res, next) {
  let data = { ...req.body };
  let imgUrl =
    "https://cdn.images.express.co.uk/img/dynamic/galleries/x701/389530.jpg";

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
