const Listing = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./Utils/ExpressError.js")
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isloggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing ! ");
        return res.redirect("/login");
    }   
    next();
}

module.exports.saveredirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of listing")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body.listing);

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg)
    } else{
        next();
    }
}


module.exports.validatereview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg)
    } else{
        next();
    }
}

module.exports.isreviewAuthor = async(req,res,next) =>{
    let {id,reviewId} = req.params;
    let foundreview = await Review.findById(reviewId);
    if(!foundreview.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of review")
        return res.redirect(`/listings/${id}`)
    }
    next();
}