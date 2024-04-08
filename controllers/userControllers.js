require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Staff = require("../models/StaffModel");
const Appointment = require("../models/AppointmentModel");
const moment = require("moment");

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: `User already exists` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: `Registration successful.` });
  } catch (error) {
    console.log(`Error in Register Controller ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Error in Register Controller ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User not found` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: `Invalid credentials` });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "10d",
    });
    res.status(200).json({ success: true, message: `Login successful`, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Login Controller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User not found` });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Authorization error: ${error.message}`,
    });
  }
};

const applyStaffController = async (req, res) => {
  try {
    const newStaff = new Staff({ ...req.body, status: "pending" });
    await newStaff.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-staff-req",
      message: `${newStaff.firstName} ${newStaff.lastName} has applied for cureit staff.`,
      data: {
        userID: newStaff._id,
        name: newStaff.firstName + " " + newStaff.lastName,
        onClickPath: "/admin/staff",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(200)
      .json({ success: true, message: `Application for staff successful` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Error while applying for staff` });
  }
};

const getAllNotification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    // user.seenNotification = notification
    const updateUser = await user.save();
    res.status(200).json({
      success: true,
      message: `All notifications marked as read`,
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while fetching notifications" });
  }
};

const deleteAllNotification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).json({
      success: true,
      message: `Notifications deleted successfully.`,
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to delete notifications.`,
      error,
    });
  }
};
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Staff.find({ status: "approved" });
    res.status(200).json({
      success: true,
      message: "Data fetched",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error while fetching data`,
      error,
    });
  }
};
const bookAppointment = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "new-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: `Appointment booked successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error while booking appointment.`,
      error,
    });
  }
};
const checkAvailability = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointment = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointment.length > 0) {
      return res.status(200).json({
        success: true,
        message: `Appointment not available at this time`,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Appointment available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error while checking availability.`,
      error,
    });
  }
};
const userAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      message: "Appointments fetched",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error while fetching appointments.`,
      error,
    });
  }
};

// const updateUser = async (req, res) => {
//   try {
//     console.log(req.body);
//     const user = await User.findOneAndUpdate(
//       { _id: req.body.userId },
//       req.body
//     );
//     res.status(201).json({
//       success: true,
//       message: "Profile data updated.",
//       data: user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: `Unable to update profile data`,
//       error,
//     });
//    }
//   }

const updateUser = async (req, res) => {
  try {
    const { userId, ...userData } = req.body; // Extract userId and userData
    const user = await User.findOneAndUpdate(
      { _id: userId },
      userData, // Update with extracted data
      { new: true, runValidators: true } // Options object
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Profile data updated.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Unable to update profile data`,
      error: error.message, // Sending only error message for security
    });
  }
};



module.exports = {  login,
  register,
  authController,
  applyStaffController,
  getAllNotification,
  deleteAllNotification,
  getAllDoctors,
  bookAppointment,
  checkAvailability,
  userAppointment,
  updateUser,
};
