const express = require('express');
const sales = require('../controllers/salesControllers');
const validation = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', sales.getAll);
router.get('/:id', sales.getById);
router.post('/', validation.post);
// router.post('/:id', validation.post);
// router.put('/', validation.post);
router.put('/:id', validation.post);

module.exports = router;