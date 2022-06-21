const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  googleScopeController,
  googleAuthController,
  registerController,
  loginController,
  logoutController,
  readUserController,
  updateUserController,
  deleteController,
  changePasswordController,
  ActivateLinkController,
  ForgottentLinkController,
  setPasswordController,
} = require("../controllers/authController");

//-----------------------Passportjs

//------ not tested
router.get("/auth/google", googleScopeController);

//------ not tested
router.get("/auth/google/posts", googleAuthController);

//---Tested signup
router.post("/api/signup", registerController);

//---Tested login
router.post("/api/login", loginController);

//Logout a user from a Client (React) it does not work on broswer only. //---Tested
router.post("/api/logout", auth, logoutController);

//Read user  //---Tested
router.get("/api/users/me", auth, readUserController);

//Update user //---Tested
router.patch("/api/users/me", auth, updateUserController);

//Delete profile and send email //---Tested
router.delete("/api/users/me", auth, deleteController);

//Change password (passport-local-mongoose) //---Tested
router.post("/api/users/change-password/me", auth, changePasswordController);

//Activate ID from CLIENT REACT//---Tested
router.post("/api/activate/:id", ActivateLinkController);

//FORGOTTEN password (passport-local-mongoose) //---Tested
router.post("/api/forgotten/password", ForgottentLinkController);

//Set password (passport-local-mongoose) //---Tested
router.post("/api/users/set-password/:id/:reset_link", setPasswordController);

//--------------------END PASSPORTJS
module.exports = router;
