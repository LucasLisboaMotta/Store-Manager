const express = require('express');
const products = require('../controllers/productsControllers');

const router = express.Router();

router.get('/', products.getAll);
router.get('/:id', products.getById);

module.exports = router;