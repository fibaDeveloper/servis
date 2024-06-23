// routes/transactions.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// GET all transactions
router.get('/', transactionController.listTransactions);

// GET a single transaction
router.get('/:id', transactionController.getTransaction);

// POST create a new transaction
router.post('/', transactionController.createTransaction);

// PUT update a transaction
router.put('/:id', transactionController.updateTransaction);

// DELETE delete a transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
