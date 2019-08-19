const db = require('../db/mongoose.connection');

//wrapper function for route functions that passing next errors

const raw = fn =>
    (req, res, next) => {
        db.connect()
            .then(() => {
                Promise.resolve(fn(req, res, next))
                    .catch(next);
            })
            .catch(next);
    };


module.exports = raw;
//raw is a function that gets a route function as parameter and return a wrapper function that
//help us to handle errors and pass them next and with that save the code cleaner
// also help us to connect lambda functions to DB