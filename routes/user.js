const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync =require("../utils/wrapasync.js")
const passport=require("passport");
const {redirectUrl}=require("../middleware.js")
const userController=require("../controllers/users.js");
const { reviewSchema } = require("../schema.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapasync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(redirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    wrapasync(userController.login))

router.get("/logout",userController.logout)

module.exports=router;