const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../Utils/wrapAsyncs.js");
const ExpressError = require("../Utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validatereview,
  isloggedIn,
  isreviewAuthor,
} = require("../middleware.js");
const reviewController = require("../Controllers/reviews.js");

//REVIWES//POST REVIEW ROUTE....aur yahan pe validatereview ko as a middleware pass kerdiya
router.post(
  "/",
  isloggedIn,
  validatereview,
  wrapAsync(reviewController.createreview)
);

//DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",
  isloggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.deletereview)
);

module.exports = router;
