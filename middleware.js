const Listing=require("./models/listing.js")
const ExpressError =require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}= require("./schema.js")
const Review=require("./models/reviews.js")

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.params.id) {
            req.session.redirectUrl = `/listings/${req.params.id}`;
        } else {
            req.session.redirectUrl = req.originalUrl;
        }

        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }

    next();
};


const redirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

const isOwner=async (req,res,next)=>{
  let{id}=req.params;
  let list=await Listing.findById(id);
  if(!list.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not allowed to do this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
const validatelisting=(req,res,next)=>{
   let{error}=listingSchema.validate(req.body)
   if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(404,errMsg)
   }
   else{
    next();
   }
}

const validateReview=(req,res,next)=>{
   let{error}=reviewSchema.validate(req.body)
   if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(404,errMsg)
   }
   else{
    next();
   }
}
const isAuthor=async (req,res,next)=>{
  let{id,reviewId}=req.params;
  let review=await Review.findById(reviewId);
  if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not allowed to do this");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports = { isLoggedIn, redirectUrl,isOwner,validatelisting ,validateReview,isAuthor};
