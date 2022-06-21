const sharp = require("sharp");
const Profile = require("../models/profile");
const User = require("../models/user");

//-------------/ CREATE PROFILE /----Tested
const createProfileController = async function (req, res, next) {
  try {
    const profile = await Profile.find({ owner: req.user._id });
    if (profile[0]) {
      res
        .status(201)
        .json({ message: "profile is already initialized", profile });
    } else {
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { profile_data: true }
      );
      const profile = new Profile({
        ...req.body,
        owner: req.user._id,
      });
      await profile.save();
      await user.save();
      res.status(201).json({ message: "success", profile });
      next();
    }
  } catch {
    res.status(404);
  }
};

//--------/ READ PROFILE /----Tested
const readProfileController = async function (req, res, err) {
  try {
    let profile = await Profile.find({ owner: req.user._id });
    profile = profile[0];

    res.status(200).json({ message: "success", profile });
  } catch (e) {
    res.status(500).json();
  }
};

//------UPDATE PROFILE --------//
const updateProfileController = async function (req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "profile_name",
    "profile_bio",
    "profile_job",
    "profile_website",
    "profile_avatar",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "invalid updates!" });
  }

  try {
    let profile = await Profile.find({ owner: req.user._id });
    profile = profile[0];

    if (!profile) {
      return res.status(404).json({ messagge_error: "profile not found" });
    }

    updates.forEach((update) => (profile[update] = req.body[update]));
    await profile.save();
    res.status(200).json({ message: "success", profile });
  } catch (e) {
    res.status(400).json(e);
  }
};

//--------- DELETE PROFILE --------//
const deleteProfileController = async function (req, res) {
  try {
    let profile = await Profile.find({ owner: req.user._id });
    profile = profile[0];
    profile.remove();

    if (!profile) {
      res.status(404).json({ messagge: "this task doesn't belong to you" });
    }

    res.json(profile);
  } catch (e) {
    res.status(500).json({ message_error: "profile not found" });
  }
};

//-----------MULTER CONFIG & CREATE A FOLDER --------//
//update image and create a folder
// const upload = multer({
//   limits: {
//     fileSize: 10000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload an image"));
//     }
//     cb(undefined, true);
//   },
// });
//   upload.single("profile_avatar"),

//----------- UPLOAD AVATAR --------//
//upload an avatar image and buffer into the database
const uploadProfilePictureController = async function (req, res) {
  let profile = await Profile.find({ owner: req.user._id });
  profile = profile[0];

  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    profile.profile_avatar = buffer;

    await profile.save();
    res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "failed" });
  }
};

//----------- DELETE AVATAR --------//
//delete a buffer image
const deleteProfilePictureController = async (req, res) => {
  let profile = await Profile.find({ owner: req.user._id });
  profile = profile[0];

  try {
    profile.profile_avatar = undefined;
    await profile.save();

    res.status(200).json({ message: "success", profile });
  } catch (e) {
    res.status(404).json({ message: "failed" });
  }
};

//----------- GET AVATAR --------//
//get avatar per ID
const readProfilePictureController = async function (req, res) {
  let profile = await Profile.find({ owner: req.user._id });
  profile = profile[0];
  try {
    if (!profile) {
      res.status(404).json({ message: "you need to create a profile" });
    }

    if (!profile.profile_avatar) {
      res.status(404).json({ message: "profile pic not found" });
    }else{
        res
      .set("Content-Type", "image/png")
      .status(200)
      .json({
        message: "success",
        profile_avatar: profile.profile_avatar.toString("base64"),
      });
    }
  } catch (e) {
    res.status(404).json({ message: "somenthing went wrong" });
  }
};

module.exports = {
  createProfileController,
  readProfileController,
  updateProfileController,
  deleteProfileController,
  uploadProfilePictureController,
  deleteProfilePictureController,
  readProfilePictureController,
};
