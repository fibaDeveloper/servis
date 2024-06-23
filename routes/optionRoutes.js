const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware'); // Doğru middleware yolu olduğundan emin olun
const optionController = require('../controllers/optionController');

// Yeni opsiyon oluşturma
router.post('/', authMiddleware, optionController.createOption);

// Kullanıcının tüm opsiyonlarını getirme
router.get('/', authMiddleware, optionController.getOptions);

// Belirli bir opsiyonun detaylarını getirme
router.get('/:optionId', authMiddleware, optionController.getOptionById);

// Kullanıcının tüm opsiyonlarının kar/zarar durumlarını getirme
router.get('/profit-loss', authMiddleware, optionController.getOptionProfitLoss);

// Opsiyonun durumunu güncelleme
router.put('/:optionId/update-status', authMiddleware, optionController.updateOptionStatus);

// Opsiyonun güncellenmesi
router.put('/:optionId', authMiddleware, optionController.updateOption);

// Opsiyonun silinmesi
router.delete('/:optionId', authMiddleware, optionController.deleteOption);

module.exports = router;
