const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./reviews.js");

const listingSchema=new Schema({
    title:{
      type:String,
      required:true,
    },
    description:String,
    image: {
               filename: {
        type: String,
        default: "listingimage"
    },
   url: {
    type: String,
    default: "https://res.cloudinary.com/p5q1rgqk/image/upload/v1793113801/photo-1611892440504-42a792e24d32.jpg",
    set: (v) =>
        v === ""
            ? "https://res.cloudinary.com/p5q1rgqk/image/upload/v1793113801/photo-1611892440504-42a792e24d32.jpg"
            : v
}
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
            ref:"User",
    },
     geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:{
    type:String,
    enum:["Trending","Hotels","Iconic cities","Amazing pools" ,"Mountains","Camping","Castles","Beaches","Farms"]
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
 if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
 }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;