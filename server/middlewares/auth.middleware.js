const jwt = require('jsonwebtoken');
const { APP_SECRET, TOKEN_EXPIRY } = require('../config/keys');

const false_response = {
    auth: false,
    token: null,
    msg: 'Token is not valid'

}

const tokenize = (payload) => {
    return jwt.sign(payload, APP_SECRET, {
        expiresIn: parseInt(TOKEN_EXPIRY)
    });
}


module.exports = {
    false_response,
    tokenize
}