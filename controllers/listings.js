const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const Listing=require("../models/listing.js");

module.exports.index=async (req,res)=>{
  const allListings=await Listing.find();
  res.render("listings/index.ejs",{allListings})  
}
module.exports.renderNewForm=(req,res)=>{
res.render("listings/new.ejs");
  }
module.exports.showlisting=async (req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!list){
        req.flash("error","listing does not exist");
      return  res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}
module.exports.postlisting=async (req,res,next)=>{

  let response=await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
if (response.body.features.length === 0) {
    req.flash("error", "Location not found. Please enter a valid location.");
    return res.redirect("/listings/new");
}
    const newlist=new Listing(req.body.listing);
    newlist.owner=req.user._id;
    newlist.geometry=response.body.features[0].geometry;
     if(typeof req.file!=="undefined"){
       let url=req.file.path;
  let filename=req.file.filename;
    newlist.image={url,filename};
     }
  let list=await newlist.save();
    req.flash("success","new listing created");
  res.redirect("/listings");
}
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    let originalUrl=list.image.url;
        if (originalUrl.includes("res.cloudinary.com")) {
        originalUrl = originalUrl.replace("/upload", "/upload/w_250");
    }
  res.render("listings/edit.ejs",{list,originalUrl});
    }
  module.exports.updatelisting=  async (req,res)=>{
        let{id}=req.params;
          let response=await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
  if (response.body.features.length === 0) {
    req.flash("error", "Location not found. Please enter a valid location.");
return res.redirect(`/listings/${id}/edit`);
}
 let list= await Listing.findByIdAndUpdate(id,req.body.listing);
         list.geometry=response.body.features[0].geometry;
        if(typeof req.file!=="undefined"){
          let url=req.file.path;
  let filename=req.file.filename;
       list.image={url,filename}
        }
        await list.save();
          req.flash("success","listing updated");      
        res.redirect(`/listings/${id}`);
    }
  module.exports.deletelisting=async (req,res)=>{
        let{id}=req.params;
       let list=await Listing.findByIdAndDelete(id);
           if(!list){
            req.flash("error","listing does not exist");
          return  res.redirect("/listings");
        }
          req.flash("success","Listing deleted");
    
       res.redirect("/listings");
    }

   
  module.exports.search=async(req,res)=>{
    const allListings=await Listing.find({title:{
      $regex:req.body.searchinfo,
      $options:"i"
    }})
      if(allListings.length===0){
      req.flash("error","Sorry! no such listings exists")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings})
  }

    

