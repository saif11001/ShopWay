const { body } = require('express-validator');

const add_Product = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({ min: 2 }).withMessage("Title must be at least 2 characters long."),
    body('price')
        .notEmpty().withMessage('Price is required.')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('short_description')
        .trim()
        .notEmpty().withMessage('Short description is required.')
        .isLength({ max: 255 }).withMessage('Short description must be less than 255 characters.'),
    body('long_description')
        .trim()
        .notEmpty().withMessage('Long description is required.')
        .isLength({ min: 10 }).withMessage('Long description must be at least 10 characters long.'),
    body('brand')
        .trim()
        .notEmpty().withMessage('Brand is required.'),
    body('status')
        .optional()
        .isIn(["active", "inactive", "draft"]).withMessage("Invalid status value"),
    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
]

const update_Product = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage("Title must be at least 2 characters long."),
    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('short_description')
        .optional()
        .trim()
        .isLength({ max: 255 }).withMessage('Short description must be less than 255 characters.'),
    body('long_description')
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage('Long description must be at least 10 characters long.'),
    body('brand')
        .optional()
        .trim(),
    body('status')
        .optional()
        .isIn(["active", "inactive", "draft"]).withMessage("Invalid status value"),
    body("quantity")
        .optional()
        .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
]

module.exports = {
    add_Product,
    update_Product,
}