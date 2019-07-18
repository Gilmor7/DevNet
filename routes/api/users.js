const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const passport = require('passport');
const Joi = require('@hapi/joi');

//bring in midllewares
const raw = require('../../middlewares/route.async.wrapper');
const { false_response, tokenize } = require('../../middlewares/auth.middleware');

// getting the user model for communication with DB
const User = require('../../models/User');

// bring in validation schemas and functions
const { registerSchema, loginSchema } = require('../../validation/user.validations');
const createJoiErrObj = require('../../validation/validation.errors.handle');

// @route  GET api/users/test
// @desc   Tests users route
// @acces  Public
router.get('/test', (req, res) => {
    res.json({ msg: 'users work' });
});

// @route  POST api/users/register
// @desc   Register user
// @acces  Public
router.post('/register', raw(async (req, res) => {
    //checking for data validation
    const result = Joi.validate({
        ...req.body,
        name: req.body.name.split(' ').join("")
    },
        registerSchema,
        { abortEarly: false }
    );

    if (result.error === null) {
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).json({ email: 'email already exist' });
        } else {
            // get the user avatar by email with gravatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',    //size
                r: 'pg',   //rating
                d: 'mm'   //default - return icon if user does not have avatar email

            });

            // hashing the password with bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const userData = {
                ...req.body,
                password: hashedPassword,
                avatar
            }

            //create a user
            const createdUser = await User.create(userData);
            res.json(createdUser);
        }

    } else res.status(400).json(createJoiErrObj(result));

}));

// @route  POST api/users/login
// @desc   login user  / return token 
// @acces  Public
router.post('/login', raw(async (req, res) => {

    //checking for data validation
    const result = Joi.validate(req.body, loginSchema,
        // { abortEarly: false }
    );

    if (result.error === null) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        //check if user email does not exist
        if (!user) {
            return res.status(404).json({
                ...false_response,
                email: 'Email is not exist',
                msg: 'User loged out'
            })
        }

        //compare the password to the hashed one from DB
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(400).json({
                ...false_response,
                password: 'Password is incorrect',
                msg: 'User loged out'
            })
        }

        // if user is found and password is valid
        // create a fresh new token
        const token = tokenize({
            id: user._id,
            name: user.name,
            avatar: user.avatar
        });

        // return the information including token as JSON
        return res.status(200).json({
            auth: true,
            token: `Bearer ${token}`
        })
    } else res.status(400).json({
        ...false_response,
        ...createJoiErrObj(result)
    });


}));

// @route  GET api/users/current
// @desc   get current user  (for test)
// @acces  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    //to get the user data now with passport auth we can get it in req.user
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
});

module.exports = router;