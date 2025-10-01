const { body } = require('express-validator');
const Category = require('../../models/category');

const add_Category = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 50 }).withMessage('Category name must be between 3 and 50 characters')
        .matches(/^[\p{L}\p{N} ]+$/u).withMessage("Category name can only contain letters, numbers, and spaces")
        .custom((value) => {
            if (/^\d+$/.test(value)) {
                throw new Error("Category name cannot be only numbers");
            }
            return true;
        })
        .custom(async (value) => {
            const existingCategory = await Category.findOne({ where: { name: value } });
            if (existingCategory) {
                throw new Error("Category name already exists");
            }
            return true;
        }),
]

const update_Category = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('Category name must be between 3 and 50 characters')
        .matches(/^[\p{L}\p{N} ]+$/u).withMessage("Category name can only contain letters, numbers, and spaces")
        .custom((value) => {
            if (/^\d+$/.test(value)) {
                throw new Error("Category name cannot be only numbers");
            }
            return true;
        })
        .custom(async (value) => {
            const existingCategory = await Category.findOne({ where: { name: value } });
            if (existingCategory) {
                throw new Error("Category name already exists");
            }
            return true;
        }),
]

module.exports = {
    add_Category,
    update_Category
}