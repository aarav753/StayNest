 const Listing=require("../models/listing.js");

 
 module.exports.trendinglist=async(req,res)=>{
    const allListings= await Listing.find({category:"Trending"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.hotelslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Hotels"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.citieslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Iconic cities"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.poolslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Amazing pools"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.mountainslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Mountains"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.campinglist=async(req,res)=>{
    const allListings= await Listing.find({category:"Camping"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.castleslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Castles"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.beacheslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Beaches"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

    module.exports.farmslist=async(req,res)=>{
    const allListings= await Listing.find({category:"Farms"})
    if(allListings.length===0){
      req.flash("error","Sorry! no listings are present here")
     return res.redirect("/listings")
    }
    res.render("listings/index.ejs",{allListings});
    }

