const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRY, APP_SECRET } = process.env;

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