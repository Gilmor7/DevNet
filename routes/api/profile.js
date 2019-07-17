const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('@hapi/joi');

//bring in midllewares
const raw = require('../../middlewares/route.async.wrapper');
const { false_response } = require('../../middlewares/auth.middleware');

// getting the models for communication with DB
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// bring in validation schemas


// @route  GET api/profile/test
// @desc   Tests profile route
// @acces  Public
router.get('/test', (req, res) => {
    res.json({ msg: 'profile work' });
});

// @route  GET api/profile
// @desc   get the current user's profile
// @acces  Private
router.get('/', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });
    const err = {};
    // check if profile exist 
    if (!profile) {
        err.noProfile = "There is not profile for this user";
        return res.status(404).json(err);
    }
    res.json(profile);
}))

module.exports = router;