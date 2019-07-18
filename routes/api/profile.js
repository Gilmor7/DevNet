const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('@hapi/joi');

//bring in midllewares
const raw = require('../../middlewares/route.async.wrapper');

// getting the models for communication with DB
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// bring in validation schemas and functions
const { profileFieldsVal } = require('../../validation/profile.validation');
const createJoiErrObj = require('../../validation/validation.errors.handle');

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
    const profile = await Profile
        .findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']);
    const err = {};
    // check if profile exist 
    if (!profile) {
        err.noProfile = "There is not profile for this user";
        return res.status(404).json(err);
    }
    res.json(profile);
}));


// @route  GET api/profile/all
// @desc   get all profiles array
// @acces  Public
router.get('/all', raw(async (req, res) => {

    const errors = {};
    const profiles = await Profile
        .find()
        .populate('user', ['name', 'avatar']);

    if (!profiles) {
        errors.noProfile = "There are no profiles";
        return res.status(404).json(errors);
    }
    res.json(profiles)
}));


// @route  GET api/profile/handle/:handle
// @desc   get profile by handle
// @acces  Public
router.get('/handle/:handle', raw(async (req, res) => {
    const profile = await Profile
        .findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar']);

    const err = {};
    //check if profile 
    if (!profile) {
        err.noProfile = "There is not such profile";
        res.status(404).json(err);
    }

    res.json(profile);
}));


// @route  GET api/profile/user/:user_id
// @desc   get profile by user id
// @acces  Public
router.get('/user/:user_id', raw(async (req, res) => {
    const profile = await Profile
        .findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar']);

    const err = {};
    //check if profile 
    if (!profile) {
        err.noProfile = "There is not such profile";
        res.status(404).json(err);
    }

    res.json(profile);
}));


// @route  POST api/profile
// @desc   create or update a profile
// @acces  Private
router.post('/', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {

    //check for data validation
    const result = Joi.validate(req.body, profileFieldsVal, { abortEarly: false });

    if (result.error === null) {
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;
        // Skills - Spilt into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //update
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                profileFields,
                { new: true });
            res.json(updatedProfile);
        } else {
            //create

            //check if handle exist 
            const isHandle = await Profile.findOne({ handle: profileFields.handle });
            if (isHandle) {
                errors.handle = "that handle is already exist";
                res.status(400).json(errors);
            } else {
                //create new profile -save in DB
                const createdProfile = await Profile.create(profileFields);
                res.json(createdProfile);
            }

        }
    } else {
        res.status(400).json(createJoiErrObj(result));
    }
}));


module.exports = router;