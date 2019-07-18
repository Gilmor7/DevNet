
//function that helps create clear and neat errors object with all the validation errors from hapi/joi
const createJoiErrObj = result => {
    const err = {};
    err.msg = {};
    err.isJoi = true;
    result.error.details.forEach(item => {
        const msg = item.message;
        //cut the first part of the error string we get from Joi  /"[path]/"
        err.msg[item.path[0]] = msg.substring(msg.indexOf(" ") + 1);
    });
    return err;
}

module.exports = createJoiErrObj;