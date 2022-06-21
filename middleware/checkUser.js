const Profile = require('../models/profile')

async function checkUser(req, res, next) {
  if(req.isAuthenticated()){
    let profile = await Profile.find({owner:req.user._id});
      console.log(profile);
      profile = profile[0];
    //req.isAuthenticated() will return true if user is logged in
    res.status(200).render({user:req.user, profile:profile});
    next();
} else{
    res.status(200).json({user:null, profile:null});
    next()
}

}

module.exports = checkUser;
