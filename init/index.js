const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js")

const dbUrl=process.env.ATLASDB_URL;
main().then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect(dbUrl)
}

const initDB=async () => {
        
 await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
    ...obj,
    owner:"6adcb6cbeb37167c28042419"
 }) );
 await Listing.insertMany(initData.data);
}
initDB();