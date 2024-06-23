
const Option = require('../models/Option');

exports.createOption = async (req, res) => {
  const { type, product, purchaseDate, expiryDate, strikePrice, currentPrice } = req.body;
  try {
    const option = new Option({
      type,
      product,
      purchaseDate,
      expiryDate,
      strikePrice,
      currentPrice,
      user: req.user.userId,
    });
    await option.save();
    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOptions = async (req, res) => {
  try {
    const options = await Option.find({ user: req.user.userId });
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOptionProfitLoss = async (req, res) => {
  try {
    const options = await Option.find({ user: req.user.userId });
    const profitLoss = options.map(option => ({
      ...option._doc,
      profitLoss: option.profitLoss,
    }));
    res.json(profitLoss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
