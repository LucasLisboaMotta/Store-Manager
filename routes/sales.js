const express = require('express');
const sales = require('../controllers/salesControllers');

const router = express.Router();

router.get('/', sales.getAll);
router.get('/:id', sales.getById);

module.exports = router;