function auth(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.status(401).json({message_error:"Please Authenticate"});
    }
  }



module.exports = auth;