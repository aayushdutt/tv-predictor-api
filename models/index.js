var mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.connect(keys.blog_database).then(() => {
  console.log("connected");
});

mongoose.Promise = Promise;

exports.UserData = require("./UserData");

module.exports = exports;
