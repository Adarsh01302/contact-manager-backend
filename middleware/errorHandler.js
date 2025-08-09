
const { contant } = require('../constant.js');
// import contant from '../constant.js';



const errorhandler = (err,req,res,next) => {
    const statuscode = res.statusCode ? res.statusCode : 500;

    switch (statuscode) {
        case contant.VALIDATION_ERROR:
            res.json({ title:"Validation Error", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});
            break;
        case contant.NOT_FOUND:
            res.json({ title:"Not Found", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});     
            break;
        case contant.FORBIDDEN:
            res.json({ title:"Forbidden", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});     
            break;
        case contant.UNAUTHORIZED:
            res.json({ title:"Unauthorized", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});     
            break;
        case contant.INTERNAL_SERVER_ERROR:
            res.json({ title:"Internal Server Error", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});     
            break;
        default:
            res.json({ title:"Internal Server Error", message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack,});
            break;
    }
}
module.exports = errorhandler;