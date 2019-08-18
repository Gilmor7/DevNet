// 'x-access-token'  header name for extracting token
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

//get secret server key for jwt
const { APP_SECRET } = process.env

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: APP_SECRET
}

module.exports = passport => {
    passport.use(new JwtStrategy(opt, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            //token is valid 
            if (user) return done(null, user);
            //if not 
            return done(null, false);

        } catch (err) {
            console.log(err);
        }

    }))
}