const { body } = require('express-validator');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const update_User = [
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 15 }).withMessage('Your name must be between 2 and 15 characters')
        .trim()
        .bail(),
    body('lastName')
        .optional()
        .isLength({ min: 2, max: 15}).withMessage('Your name must be between 2 and 15 characters')
        .trim()
        .bail(),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please enter a valid email.')
        .toLowerCase()
        .normalizeEmail()
        .custom(async (value) => {
            const userDOC = await User.findOne({ where:{ email: value } })
            if(userDOC) {
                throw new Error('E-mail exists already, please pick a different one.')
            }
        })
        .bail(),
    body('password')
        .optional()
        .trim()
        .matches(passwordRegex).withMessage('Password must be 8-20 characters, include uppercase, lowercase, number, and special character.')
        .isLength({ min: 8, max: 20 }).withMessage('Your password must be between 8 and 20 characters long.')
        .bail(),
    body('userRole')
        .optional()
        .isIn(['user', 'manager', 'admin']).withMessage('Invalid role. Must be one of: user, manager, admin')
        .trim()
        .bail()
]

module.exports = {
    update_User
}