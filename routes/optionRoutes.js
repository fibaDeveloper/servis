
const express = require('express');
const { createOption, getOptions, getOptionProfitLoss } = require('../controllers/optionController');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOption);
router.get('/', authMiddleware, getOptions);
router.get('/profit-loss', authMiddleware, getOptionProfitLoss);

module.exports = router;
