const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

// Lazy-init: don't create the geocoder at module load time.
// In serverless environments the module loads before env vars are guaranteed,
// so we create the client on first use instead.
let _geocoder;
const getGeocoder = () => {
    if (!_geocoder) {
        _geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
    }
    return _geocoder;
};

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};
module.exports.createCampground =async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
   const geoData =  await getGeocoder().forwardGeocode({
       query: req.body.campground.location,
       limit: 1
   }).send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry ;
    campground.images = req.files.map(f => ({
        url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Campground created successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({path: 'reviews',
            populate: {
                path:'author'
            }})
        .populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground not found');
        return res.redirect('/campgrounds');
    };
    res.render('campgrounds/edit', { campground });
};
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
           await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    
    };
    req.flash('success', 'Campground updated successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground deleted successfully!!!');
    res.redirect('/campgrounds/');
};
