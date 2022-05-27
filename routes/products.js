const express = require('express');
const products = require('../controllers/productsControllers');
const valition = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', products.getAll);
router.get('/:id', products.getById);
router.post('/', valition.post, products.post);
router.put('/:id', valition.post, products.put);
router.delete('/:id', products.delete);

module.exports = router;