const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {upload} = require("../middleware/multer");
const {
  createProfileController,
  readProfileController,
  updateProfileController,
  deleteProfileController,
  uploadProfilePictureController,
  deleteProfilePictureController,
  readProfilePictureController,
} = require("../controllers/profileController");

//-------------/ CREATE PROFILE /----Tested
router.post("/api/profile", auth, createProfileController);

//--------/ READ PROFILE /----Tested
router.get("/api/profile/me", auth, readProfileController);

//------UPDATE PROFILE --------//
router.patch("/api/profile/update", auth, updateProfileController);

//--------- DELETE PROFILE --------//
router.delete("/api/profile/delete", auth, deleteProfileController);

//----------- UPLOAD AVATAR --------//
//upload an avatar image and buffer into the database
router.post("/api/profile/avatar", upload.single("profile_avatar"), auth, uploadProfilePictureController);

//----------- DELETE AVATAR --------//
//delete a buffer image
router.delete("/api/profile/avatar/delete", auth, deleteProfilePictureController);

//----------- GET AVATAR --------//
//get avatar per ID
router.get("/api/profile/avatar", auth, readProfilePictureController);

module.exports = router;
