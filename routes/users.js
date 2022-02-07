const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const User = require('../models/user');
const passport = require('passport');


// Register routes
router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.registerForm));

//Login Routes
router.get('/login', users.renderLogin);

router.post('/login', passport.authenticate('local',
    {failureFlash: true, failureRedirect: '/login'}), users.loginForm );

//Logout Routes
router.get('/logout', users.renderLogout);

module.exports = router;