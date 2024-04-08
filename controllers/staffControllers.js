const Appointment = require("../models/AppointmentModel");
const Staff = require("../models/StaffModel");
const User = require("../models/UserModel");

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      message: "Profile data fetched.",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to fetch profile data`,
      error,
    });
  }
};
const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Profile data updated.",
      data: staff,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to update profile data`,
      error,
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Staff.findOne({ _id: req.body.doctorId });
    res.status(200).json({
      success: true,
      message: `Doctor information fetched.`,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to fetch the data`,
      error,
    });
  }
};

const doctorAppointment = async (req, res) => {
  try {
    const doctor = await Staff.findOne({ userId: req.body.userId });
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).json({
      success: true,
      message: `Appointments fetched.`,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to fetch appointments`,
      error,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
    const user = await User.findOne({ _id: appointments.userId });
    user.notification.push({
      type: "status-updated",
      message: `Your appointment has been updated. Current status: ${status}`,
      onClickPath: "/appointments",
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: `Status updated`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Something went wrong`,
      error,
    });
  }
};

module.exports = {
  getStaff,
  updateStaff,
  getDoctorById,
  doctorAppointment,
  updateStatus,
};
