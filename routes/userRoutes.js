const {
  login,
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
} = require("../controllers/userControllers");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/getUserData", authorization, authController);
router.post("/apply-staff", authorization, applyStaffController);
router.post("/get-all-notification", authorization, getAllNotification);
router.post("/delete-all-notification", authorization, deleteAllNotification);
router.get("/get-all-doctor", authorization, getAllDoctors);
router.post("/book-appointment", authorization, bookAppointment);
router.post("/check-availability", authorization, checkAvailability);
router.get("/user-appointment", authorization, userAppointment);
router.post("/update-user", authorization, updateUser);

module.exports = router;
