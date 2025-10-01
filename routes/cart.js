const express = require('express');
const cartController = require('../controllers/cart');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/',
    verifyToken,
    cartController.getCart
);

router.post('/',
    verifyToken,
    cartController.addItem
);

router.put('/',
    verifyToken,
    cartController.updateItem
);

router.delete('/',
    verifyToken,
    cartController.deleteItem
);

module.exports = router;