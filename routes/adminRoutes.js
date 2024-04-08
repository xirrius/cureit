const {
  getAllUsers,
  getAllStaff,
  changeStatus,
  blockUser,
} = require("../controllers/adminControllers");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/get-all-users", authorization, getAllUsers);
router.get("/get-all-staff", authorization, getAllStaff);
router.post("/change-status", authorization, changeStatus);
router.post("/block-user", authorization, blockUser);

module.exports = router;
