const { getStaff, updateStaff, getDoctorById, doctorAppointment, updateStatus } = require("../controllers/staffControllers");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.post("/get-staff", authorization, getStaff);
router.post("/update-staff", authorization, updateStaff);
router.post("/get-doctor", authorization, getDoctorById);
router.get("/doctor-appointments", authorization, doctorAppointment);
router.post("/update-status", authorization, updateStatus);

module.exports = router;
