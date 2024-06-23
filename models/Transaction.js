// models/Transaction.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    optionId: { type: Schema.Types.ObjectId, ref: 'Option', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactionType: { type: String, enum: ['Purchase', 'Sale'], required: true },
    transactionDate: { type: Date, default: Date.now },
    transactionAmount: { type: Number, required: true },
    transactionStatus: { type: String, enum: ['Completed', 'Cancelled'], required: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
