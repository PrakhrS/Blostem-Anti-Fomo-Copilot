const FomoIntervention = require('../models/FomoIntervention');
const User = require('../models/User');
const { getSentiment } = require('../utils/sentimentMap');
const { evaluateTrade } = require('../utils/openaiClient');

// @desc    Evaluate a trade and potentially create a FOMO intervention
// @route   POST /api/trade/evaluate
const evaluateAndSaveTrade = async (req, res, next) => {
  try {
    const { assetSymbol, amount } = req.body;
    
    if (!assetSymbol || !amount) {
      res.status(400);
      throw new Error('Please provide assetSymbol and amount');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const sentiment = getSentiment(assetSymbol);

    // Call the OpenAI Engine
    const evaluationResult = await evaluateTrade(
      {
        monthlyIncome: user.monthlyIncome,
        liquidCash: user.liquidCash,
        riskProfile: user.riskProfile,
      },
      assetSymbol,
      amount,
      sentiment
    );

    // Save the intervention result in the database
    const intervention = await FomoIntervention.create({
      userId: req.user._id,
      attemptedAsset: assetSymbol,
      attemptedAmount: amount,
      fomoScore: evaluationResult.fomoScore,
      aiReasoning: evaluationResult.aiReasoning,
      suggestedAlternative: evaluationResult.suggestedAlternative,
      status: 'Pending',
    });

    res.status(201).json({
      intervention,
      message: 'Trade evaluated via AI Engine',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { evaluateAndSaveTrade };
