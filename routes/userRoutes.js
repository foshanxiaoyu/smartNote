const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
router
  //   .route("/")
  .get("/list", userController.getAllUsers)
  .post("/newuser", userController.createNewUser)
  .patch("/upuser", userController.updateUser)
  .delete("/deluser", userController.deleteUser);

module.exports = router;
