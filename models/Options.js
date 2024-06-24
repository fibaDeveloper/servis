const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionsSchema = new Schema({
    type: { type: String, enum: ['Call', 'Put'], required: true },
    underlyingAsset: { type: String, required: true },
    strikePrice: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    premium: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Active', 'Used', 'Cancelled'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Option', OptionsSchema);
