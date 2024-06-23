const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['put', 'call'],
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  strikePrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

OptionSchema.virtual('profitLoss').get(function() {
  if (this.type === 'call') {
    return Math.max(0, this.currentPrice - this.strikePrice);
  } else {
    return Math.max(0, this.strikePrice - this.currentPrice);
  }
});

module.exports = mongoose.model('Option', OptionSchema);
