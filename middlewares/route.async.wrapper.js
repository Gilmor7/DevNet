// const db = require('../db/mongoose.connection');
// const { NODE_ENV } = process.env

//wrapper function for route functions that passing next errors
const raw = fn =>
    (req, res, next) => {
        // db.connect()
        // .then(() => {
        Promise.resolve(fn(req, res, next))  //promise resolve is neccessary for fn that is not async because it not return promise 
            .catch(err => next(err))
        // })
        // .catch(err => {
        //     console.log(err)
        //     res.status(500).json({ message: 'Can not connect to Database' })
        // })

    };

module.exports = raw;

//raw is a function that gets a route function as parameter and return a wrapper function that 
//help us to handle errors and pass them next and with that save the code cleaner