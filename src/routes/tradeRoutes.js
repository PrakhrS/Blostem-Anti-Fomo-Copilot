const express = require('express');
const router = express.Router();
const { evaluateAndSaveTrade } = require('../controllers/tradeController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/evaluate', protect, evaluateAndSaveTrade);

module.exports = router;
