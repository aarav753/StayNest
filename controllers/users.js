const User=require("../models/user.js");


module.exports.renderSignupForm=async (req,res)=>{
    res.render("user/signup.ejs");
}
module.exports.signup=async(req,res,next)=>{
    try{
 let {username,email,password}=req.body;
 const newUser=new User({username,email});
 const registeredUser=await User.register(newUser,password);
 req.login(registeredUser,(err)=>{
    if(err){
        next(err);
    }
    else{
 req.flash("success","Welcome to StayNest!");
 res.redirect("/listings");
    }
 })

    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}
module.exports.renderLoginForm=async(req,res)=>{
   res.render("user/login.ejs");
}
module.exports.login=async(req,res)=>{
 req.flash("success","Welcome back to StayNest!");
 res.redirect(res.locals.redirectUrl || "/listings");
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
}
req.flash("success","You logged out successfully!")
res.redirect("/listings");
})
}