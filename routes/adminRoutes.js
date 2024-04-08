const {
  getAllUsers,
  getAllStaff,
  changeStatus,
} = require("../controllers/adminControllers");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/get-all-users", authorization, getAllUsers);
router.get("/get-all-staff", authorization, getAllStaff);
router.post("/change-status", authorization, changeStatus);

module.exports = router;
