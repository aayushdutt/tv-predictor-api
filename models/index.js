var mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(keys.blog_database).then(()=>{console.log("connected")});

mongoose.Promise = Promise;

exports.MedData = require("./UserData");

module.exports = exports