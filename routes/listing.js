const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsyncs.js");
const Listing = require("../models/listing.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const listingcontroller = require("../Controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isloggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingcontroller.createlisting)
  );

//NEW ROUTE
router.get("/new", isloggedIn, listingcontroller.rendernewforms);

router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showlistings))
  .put(
    isloggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingcontroller.updatelisting)
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingcontroller.deletelisting));

// //INDEX ROUTE
// router.get("/", wrapAsync(listingcontroller.index))

//SHOW ROUTE
// router.get("/:id" , wrapAsync (listingcontroller.showlistings));

// //CREATE ROUTE
// router.post("/",validateListing, isloggedIn,wrapAsync (listingcontroller.createlisting));

//EDIT ROUTE
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingcontroller.renderEditform)
);

//UPDATE ROUTE
// router.put("/:id",isloggedIn,validateListing,isOwner,wrapAsync (listingcontroller.updatelisting));

//DELETE ROUTE
// router.delete("/:id", isloggedIn,isOwner,wrapAsync (listingcontroller.deletelisting));

module.exports = router;
