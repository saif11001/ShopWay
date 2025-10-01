const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');
const validate = require('../middlewares/validate/validateAuth');
const handleValidationErrors = require('../middlewares/validate/handleValidationErrors');
const { authLimiter } = require('../middlewares/rateLimiter');

router.post('/register',
    validate.register,
    handleValidationErrors,
    authLimiter,
    authController.register
);

router.post('/login',
    validate.login,
    handleValidationErrors,
    authLimiter,
    authController.login
);

router.post('/logout',
    verifyToken,
    authController.logout
);

module.exports = router;