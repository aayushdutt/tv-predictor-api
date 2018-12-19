var mongoose = require("mongoose");

var userDataSchema = new mongoose.Schema({
  user_name: {
    type: String
  },
  img: {
    type: String
  },
  faceId: {
    type: String
  },
  age: {
    type: String
  },
  preferences: [
    {
      title: { type: String },
      img: { type: String },
      timing: { type: String },
      duration: { type: String }
    }
  ]
});

var UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
