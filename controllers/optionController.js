// controllers/optionController.js

const Option = require('../models/Options');

// List all options
exports.listOptions = async (req, res) => {
    try {
        const options = await Option.find();
        res.json(options);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single option
exports.getOption = async (req, res) => {
    const id = req.params.id;
    try {
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }
        res.json(option);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new option
exports.createOption = async (req, res) => {
    const { type, underlyingAsset, strikePrice, expiryDate, premium, status } = req.body;
    try {
        const newOption = new Option({
            type,
            underlyingAsset,
            strikePrice,
            expiryDate,
            premium,
            createdBy: req.user.userId, // JWT'den gelen kullanıcı bilgisi
            status
        });
        const savedOption = await newOption.save();
        res.status(201).json(savedOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an option
exports.updateOption = async (req, res) => {
    const id = req.params.id;
    const { type, underlyingAsset, strikePrice, expiryDate, premium, status } = req.body;
    try {
        const updatedOption = await Option.findByIdAndUpdate(id, {
            type,
            underlyingAsset,
            strikePrice,
            expiryDate,
            premium,
            createdBy: req.user.userId, // JWT'den gelen kullanıcı bilgisi
            status,
            updatedAt: Date.now()
        }, { new: true });
        if (!updatedOption) {
            return res.status(404).json({ message: 'Option not found' });
        }
        res.json(updatedOption);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an option
exports.deleteOption = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedOption = await Option.findByIdAndDelete(id);
        if (!deletedOption) {
            return res.status(404).json({ message: 'Option not found' });
        }
        res.json({ message: 'Option deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
