// controllers/transactionController.js

const Transaction = require('../models/Transaction');

// List all transactions
exports.listTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single transaction
exports.getTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { optionId, userId, transactionType, transactionAmount, transactionStatus } = req.body;
    try {
        const newTransaction = new Transaction({
            optionId,
            userId,
            transactionType,
            transactionAmount,
            transactionStatus
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const id = req.params.id;
    const { optionId, userId, transactionType, transactionAmount, transactionStatus } = req.body;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
            optionId,
            userId,
            transactionType,
            transactionAmount,
            transactionStatus,
            updatedAt: Date.now()
        }, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
