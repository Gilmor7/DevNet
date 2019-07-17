//wrapper function for route functions that passing next errors
const raw = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))  //promise resolve is neccessary for fn that is not async because it not return promise 
            .catch(err => console.log(err))
    };

module.exports = raw;

//raw is a function that gets a route function as parameter and return a wrapper function that 
//help us to handle errors and pass them next and with that save the code cleaner