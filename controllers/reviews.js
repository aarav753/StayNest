const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js")

module.exports.postReview=async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    let newreview=new Review(req.body.review);   
    newreview.author=req.user._id;
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
   req.flash("success","new review created");
   res.redirect(`/listings/${id}`);
}

module.exports.deleteReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
      req.flash("success","review deleted");
    res.redirect(`/listings/${id}`)
}