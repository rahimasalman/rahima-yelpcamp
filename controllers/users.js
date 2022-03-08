const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports.showCampground = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        req.session.returnTo = req.session.previousReturnTo;
        console.log('Invalid campground show id, returnTo reset to:', req.session.returnTo);
    }
}
    // all other controller code should come below


module.exports.renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/campgrounds');
    };
    res.render('users/register')
};

module.exports.registerForm = async (req,res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=> {
            if (err) return next(err);
            req.flash('success','Welcome to Yelp-Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    };
};

module.exports.renderLogin = (req, res) => {
     if (req.isAuthenticated()) {
        return res.redirect('/campgrounds');
    };
    res.render('users/login');
};
module.exports.loginForm = async (req,res) => {
    req.flash('success', "Welcome back! We've missed you!");
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.renderLogout = (req, res)=> {
    req.logout();
    req.flash('success', "We're sorry to see you go :( ");
    res.redirect('/campgrounds');
};