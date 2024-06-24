// routes/optionRoutes.js

const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const auth = require('../utils/authMiddleware'); // JWT doğrulama orta katmanını import edin

// GET all options
router.get('/', auth, optionController.listOptions);

// GET a single option
router.get('/:id', auth, optionController.getOption);

// POST create a new option
router.post('/', auth, optionController.createOption);

// PUT update an option
router.put('/:id', auth, optionController.updateOption);

// DELETE delete an option
router.delete('/:id', auth, optionController.deleteOption);

module.exports = router;
