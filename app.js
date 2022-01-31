//require function is the easiest way to include modules that exist in separate files
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//Routes
const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');


//Our Database connection-----------------------------------------------------
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Configuration for app ------------------------------------------------------
const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware-------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
const sessionConfig = {
    secret: 'fake secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }};

//Use app.use(session()) before passport.session() to make sure login sessions ll be restored in the correct order
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());

// if app uses persistent login sessions that middleware must be used
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// How to get or store user in the session
passport.deserializeUser(User.deserializeUser());

// How to get a user out of that session
passport.serializeUser(User.serializeUser());

app.use((req, res, next) => { 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});



app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);


// app.get('/fakeUser', async (req, res) =>{
//     const user = new User ({
//         email: "cat@meow.com", username: "catmeow"});
//     const newUser= await User.register(user, "xoxan");
//     res.send(newUser);
// });

app.get('/', (req, res) => {
    res.render('home');
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!!!" } = err;
    if (!err.message) err.message = 'OHH NO, SOMETHING WENT WRONG!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});