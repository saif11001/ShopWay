const express = require('express');
const orderController = require('../controllers/order');
const verify = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRole = require('../utils/userRole');

const router = express.Router();

router.post('/',
    verify,
    orderController.checkOut
);

router.get('/',
    verify,
    orderController.getOrder
);

module.exports = router;