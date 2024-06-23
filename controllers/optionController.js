const Option = require('../models/Option');

// Yeni opsiyon oluşturma
exports.createOption = async (req, res) => {
  try {
    const option = await createOption(req.body, req.user.userId);
    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kullanıcının tüm opsiyonlarını getirme
exports.getOptions = async (req, res) => {
  try {
    const options = await getOptionsByUser(req.user.userId);
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kullanıcının tüm opsiyonlarının kar/zarar durumlarını getirme
exports.getOptionProfitLoss = async (req, res) => {
  try {
    const profitLoss = await calculateProfitLoss(req.user.userId);
    res.json(profitLoss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Yeni opsiyon oluşturma işlevi
const createOption = async (optionData, userId) => {
  const { type, product, purchaseDate, expiryDate, strikePrice, currentPrice } = optionData;
  const option = new Option({
    type,
    product,
    purchaseDate,
    expiryDate,
    strikePrice,
    currentPrice,
    user: userId,
  });
  return await option.save();
};

// Kullanıcının tüm opsiyonlarını getirme işlevi
const getOptionsByUser = async (userId) => {
  return await Option.find({ user: userId });
};

// Kullanıcının tüm opsiyonlarının kar/zarar durumlarını hesaplama işlevi
const calculateProfitLoss = async (userId) => {
  const options = await getOptionsByUser(userId);
  return options.map(option => ({
    ...option._doc,
    profitLoss: option.type === 'call' ? Math.max(0, option.currentPrice - option.strikePrice) : Math.max(0, option.strikePrice - option.currentPrice),
  }));
};
