const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please enter the name`],
  },
  email: {
    type: String,
    required: [true, `Please enter an email address`],
    minlength: 5,
    maxlength: 50,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, `Please enter a password`],
    minlength:3
  },
  isAdmin: {
    type: Boolean,
    default: false
  }, 
  isStaff: {
    type: Boolean,
    default: false
  }, 
  notification: {
    type:Array,
    default:[]
  },
  seenNotification: {
    type:Array,
    default:[]
  }
});

module.exports = mongoose.model("User", userSchema);
