const User = require("../models/UserModel");
const Staff = require("../models/StaffModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ success: true, message: `Users fetched.`, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to fetch the users data`,
      error,
    });
  }
};
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({});
    res
      .status(200)
      .json({ success: true, message: `Staff fetched.`, data: staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to fetch the staff data`,
      error,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { staffId, status } = req.body;
    const staff = await Staff.findByIdAndUpdate(staffId, { status });
    const user = await User.findOne({ _id: staff.userId });
    const notification = user.notification;
    notification.push({
      type: "staff-account-request-updated",
      message: `Your staff account has been ${status}`,
      onClickPath: "/notification",
    });
    user.isStaff = status === "approved" ? true : false;
    // delete staff
    if (status === "rejected") {
      await Staff.deleteOne({ _id: staffId });
    }
    await user.save();
    res
      .status(201)
      .json({ success: true, message: `Staff status updated`, data: staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to change the status.`,
      error,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.personId);
    res
      .status(201)
      .json({ success: true, message: `User blocked successfully.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Unable to block the user.`,
      error,
    });
  }
};

module.exports = { getAllStaff, getAllUsers, changeStatus, blockUser };
