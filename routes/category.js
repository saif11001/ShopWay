const express = require('express');

const categoryController = require('../controllers/category');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRole = require('../utils/userRole');
const validate = require('../middlewares/validate/validateCategory');
const handleValidationErrors = require('../middlewares/validate/handleValidationErrors');
const { productCategoryLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.get('/',
    verifyToken,
    categoryController.getCategories
);

router.get('/:id',
    verifyToken,
    categoryController.getCategory
);

router.post('/',
    verifyToken,
    allowedTo(userRole.ADMIN),
    validate.add_Category,
    handleValidationErrors,
    productCategoryLimiter,
    categoryController.addCategory
);

router.put('/:id',
    verifyToken,
    allowedTo(userRole.ADMIN),
    validate.update_Category,
    handleValidationErrors,
    productCategoryLimiter,
    categoryController.updateCategory
);

router.delete('/:id',
    verifyToken,
    allowedTo(userRole.ADMIN),
    categoryController.deleteCategory
);

module.exports = router;