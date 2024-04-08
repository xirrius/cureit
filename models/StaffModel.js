const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, `Please enter the first name`],
    },
    lastName: {
      type: String,
      required: [true, `Please enter the address`],
    },
    phone: {
      type: String,
      required: [true, `Please enter the contact number`],
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
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, `Please enter the address`],
    },
    specialization: {
      type: String,
      required: [true, `Specialization is required`],
    },
    experience: {
      type: String,
      required: [true, `Experience is required`],
    },
    fees: {
      type: Number,
      required: [true, `Please enter the consultation fee`],
    },
    status: {
      type: String,
      default: 'pending'
    },
    timings: {
      type: Object,
      required: [true, `Please enter the time slots`],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
