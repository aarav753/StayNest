const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync =require("../utils/wrapasync.js")
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js")


//post review
router.post("/",isLoggedIn,validateReview,wrapasync(reviewController.postReview))

//DELETE REVIEW
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapasync(reviewController.deleteReview))

module.exports=router;