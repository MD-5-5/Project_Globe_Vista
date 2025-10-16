const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
const port = 8080;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ashram");
}

const initDB = async () => {
  await Listing.deleteMany({});
  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "68ef2e58e15e353eab05e508",
  }));
  await Listing.insertMany(data.data);
  console.log("data was initialised");
};

initDB();
