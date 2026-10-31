const express=require("express");
const router=express.Router();
const wrapasync =require("../utils/wrapasync.js")
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js")
const listingController=require("../controllers/listings.js")
const categoryController=require("../controllers/listingcategory.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})

router.get("/new",isLoggedIn,listingController.renderNewForm)

router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validatelisting,wrapasync(listingController.postlisting))

router.get("/trending",wrapasync(categoryController.trendinglist))
router.get("/hotels",wrapasync(categoryController.hotelslist))
router.get("/cities",wrapasync(categoryController.citieslist))
router.get("/pools",wrapasync(categoryController.poolslist))
router.get("/mountains",wrapasync(categoryController.mountainslist))
router.get("/camping",wrapasync(categoryController.campinglist))
router.get("/castles",wrapasync(categoryController.castleslist))
router.get("/beaches",wrapasync(categoryController.beacheslist))
router.get("/farms",wrapasync(categoryController.farmslist))

router.route("/:id")
.get(wrapasync(listingController.showlisting))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting,wrapasync(listingController.updatelisting))
.delete(isLoggedIn,isOwner,wrapasync(listingController.deletelisting))

router.get("/:id/edit",isLoggedIn,isOwner,wrapasync( listingController.renderEditForm))

router.post("/search",wrapasync(listingController.search));

module.exports=router;