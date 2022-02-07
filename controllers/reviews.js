const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review created successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview =async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = await Review.findById(req.params.reviewId);
    campground.reviews.pull(review);
    await campground.save();
    await review.remove();
    req.flash('success', 'Review deleted successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
};

