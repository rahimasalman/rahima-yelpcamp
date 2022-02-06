const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');
const {validateReview, isLoggedIn} =  require('../middleware')

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review created successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = await Review.findById(req.params.reviewId);
    campground.reviews.pull(review);
    await campground.save();
    await review.remove();
    req.flash('success', 'Review deleted successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
}));


module.exports = router;