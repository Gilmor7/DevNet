
//global error handler for server errors and mongoDB errors
const error_handler = (err, req, res, next) => {
    console.log(err);
    if (err.model) {
        //DB error
        res.status(404).json({ msg: 'Not found' });
    }
    else res.status(500).json({ status: 'internal server error...' });


}

const not_found = (req, res) => {
    res.status(404).json({ status: `url: ${req.url} not found...` });
}

module.exports = {
    error_handler,
    not_found

}