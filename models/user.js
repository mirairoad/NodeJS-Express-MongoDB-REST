const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Task = require("./task");
const Post = require("./post");
const Profile = require("./profile");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    role: {
      type: String,
      enum : ['user','admin'],
      required: true,
      default: "user",
      lowercase: true,
    },
    profile_data: {
      type: Boolean,
      required: true,
      default: 0,
    },
    active:{
      type:Boolean,
      default:false,
    },
    reset_link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//------ Relational model ------ //

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("profiles", {
  ref: "Profile",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.token;
  delete userObject.profiles;
  delete userObject.avatar;

  return userObject;
};

//Delete user tasks with user removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  await Post.deleteMany({ owner: user._id });
  await Profile.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

// PASSPORT ANY STRATEGIES"
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  
    done(null, user.id);

});


passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.SITE_URL + "/auth/google/",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id, username:profile.email  }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

module.exports = User;
