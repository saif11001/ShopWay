const { validationResult } = require('express-validator');
const httpStatusText = require('../../utils/httpStatusText');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const firstError = errors.array()[0];
        return res.status(422).json({ 
            status: httpStatusText.FAIL,
            message: firstError.msg
        });
    };
    next();
};

module.exports = handleValidationErrors;