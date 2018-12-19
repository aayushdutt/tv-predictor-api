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

//Image storage
// const multer = require("multer");
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");

// cloudinary.config(cloudinaryConfiguration);
// console.log("cloud name=", cloudinaryConfiguration.cloud_name);

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "demo",
//   allowedFormats: ["jpg", "png"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }]
// });

// const parser = multer({ storage: storage });

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
  let data = req.body.data;
  let imgUrl =
    "https://cdn.images.express.co.uk/img/dynamic/galleries/x701/389530.jpg";

  let headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": faceAPIKey
  };

  let bodyData = { url: imgUrl };

  var options = {
    method: "POST",
    url: GENERATE_ID_URL,
    body: JSON.stringify(bodyData),
    headers
  };

  request(options, function(err, response, body) {
    if (!err) {
      var info = JSON.parse(body);
      console.log("success");
      return res.json(info);
    } else {
      console.log("error is there");
      console.log(err);
    }
  });

  // db.UserData.create(data)
  //   .then(function(msg) {
  //     return res.json({ success: true });
  //   })
  //   .catch(function(err) {
  //     res.json({ success: false });
  // });
});

// ===============TEST===============

// router.post("/test", parser.single("image"), (req, res) => {
//   console.log(JSON.stringify(req.body, null, 4));
//   // console.log(req.body); // to see what is returned to you
//   // const image = {};
//   // image.url = req.file.url;
//   // image.id = req.file.public_id;

//   // Image.create(image) // save image information in database
//   //   .then(newImage => res.json(newImage))
//   //   .catch(err => console.log(err));
// });

module.exports = router;
