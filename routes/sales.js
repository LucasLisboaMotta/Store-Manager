const express = require('express');
const sales = require('../controllers/salesControllers');
const validation = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', sales.getAll);
router.get('/:id', sales.getById);
router.post('/', validation.post, sales.post);
router.put('/:id', validation.post, sales.put);

module.exports = router;