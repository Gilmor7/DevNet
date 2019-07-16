const mongoose = require('mongoose');

// create user schema 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// export the user model with that we can connect
//  with the users model in DB
module.exports = User = mongoose.model('users', UserSchema);