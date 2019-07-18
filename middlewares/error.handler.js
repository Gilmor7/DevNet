
//global error handler for server errors and mongoDB errors
const error_handler = (err, req, res, next) => {
    console.log(err);
    if (err.model) {
        //DB error
        const errors = {};
        //clean the message for clearer error response
        const errType = err.message.substring(err.message.indexOf("model") + 7, err.message.length - 1);
        errors[errType] = `${errType} is not found`;
        res.status(404).json(errors);
    }
    else res.status(500).json({ status: 'internal server error...' });

    // if(NODE_ENV === 'development')res.status(500).json({status:err.message,stack:err.stack});

}

const not_found = (req, res) => {
    res.status(404).json({ status: `url: ${req.url} not found...` });
}

module.exports = {
    error_handler,
    not_found

}