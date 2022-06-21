const passport = require("passport");
const User = require("../models/user");
const {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendForgottenEmail,
  } = require("../emails/account");


// google oAuth
const googleScopeController = async function (req, res, next) {
    passport.authenticate("google", { scope: ["profile"] })
};

// google oAuth
const googleAuthController = async function (req, res, next) {
passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
};

  // signup controller
const registerController = async function (req, res, next) {
    User.register(
        { username: req.body.username },
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.status(403).json({ message_error:err.message, message:"failed"});
          } else {
            passport.authenticate("local")(req, res, function () {
              sendWelcomeEmail(req.user.username, req.user._id);
              res.json({ message: "success", user:req.user });
            });
          }
        }
      );
};

// login controller
const loginController = async function (req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      req.login(user, function (err) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          // use as API failureRedirect: '/login',
          passport.authenticate("local")(req, res, function () {
            res.status(201).json({ message: "success", user:req.user });
          });
        }
      });
};

// logout controller
const logoutController = async function (req, res, next) {
req.logout();
  res.status(200).json({ message: "success" });
};

// find by id and delete post
const readUserController = async function (req, res, next) {
    res.status(201).json({ user: req.user, message: "success" });
};

// find by id and delete post
const updateUserController = async function (req, res, next) {
    // console.log(req.sessionID);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["role"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message_error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).json({ profile: req.body, message: "success" });
  } catch (e) {
    res.status(400).json({ e, message: "failed" });
  }
};

// find by id and delete post
const deleteController = async function (req, res, next) {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user.username);
        res.json({ message: "your account has been removed", user: req.user });
      } catch (e) {
        res.status(500).json();
      }
  };


// find by id and delete post
const changePasswordController = async function (req, res, next) {
    const user = await User.findById(req.user._id);
    user.changePassword(
      req.body.currentpassword,
      req.body.newpassword,
      function (err) {
        if (err) {
          console.log(err);
          res.status(401).json({ message_error: "password incorrect" });
        } else {
          res.status(201).json({ message: "password changed" });
        }
      }
    );
};

// find by id and delete post
const ActivateLinkController = async function (req, res, next) {
    try{
        const user = await User.findById({ _id:req.params.id });
        if (err || !user) {
          res.status(401).json({message:"the link has expired"});
          }else{
            if (user.active === false) {
              await User.findByIdAndUpdate(user._id, { active: true });
              res.status(201).json({ message:"the user has been verified"});
            } else {
              res.status(200).json({ message:"the user is already verified"});
            }
          }
      }catch(e){
        res.status(401).json({message:"the link has expired"});
      }
};

// find by id and delete post
const ForgottentLinkController = async function (req, res, next) {
    const vToken = function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    const username = {
      username: req.body.username,
    };
    
      await User.findOneAndUpdate(username,{reset_link:vToken(30)});
      const user = await User.findOne(username);
    
      if (user) {
        sendForgottenEmail(user.username, user._id, user.reset_link);
        res.status(200).json({ message: "check your email box" });
        setTimeout(() => {
          console.log("the link has expired");
          user.reset_link ="link_is_expired";
          user.save();
        }, 500000);
      } else {
        res.status(401).json({ message_error: "user not found" });
      }
};

// find by id and delete post
const setPasswordController = async function (req, res, next) {
    try{
        const user = await User.findOne({_id:req.params.id, reset_link:req.params.reset_link});
      // console.log(user);
      if(!user || user.reset_link=="link_is_expired"){
        res.status(404).json({message: "token not valid"})
      }else{
        user.setPassword(req.body.password, function (err, user) {
          if (err) {
            res.status(401).json({ message_error: "password incorrect"});
          } else {
            user.reset_link="link_is_expired";
            user.save();
            res.status(201).json({ message: "password changed"});
          }
        });
      }
      }catch(e){
        // console.log(e);
        res.status(404).json({message: "token not valid"});
      }
};


module.exports={
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
    setPasswordController
}