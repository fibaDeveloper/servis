// routes/options.js

const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

// GET all options
router.get('/', optionController.listOptions);

// GET a single option
router.get('/:id', optionController.getOption);

// POST create a new option
router.post('/', optionController.createOption);

// PUT update an option
router.put('/:id', optionController.updateOption);

// DELETE delete an option
router.delete('/:id', optionController.deleteOption);

module.exports = router;
