const { OpenAI } = require('openai');

const openai = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
});

const evaluateTrade = async (userData, assetSymbol, amount, sentiment) => {
  const prompt = `
    User Profile:
    - Monthly Income: ${userData.monthlyIncome}
    - Liquid Cash: ${userData.liquidCash}
    - Risk Profile: ${userData.riskProfile}

    Trade Attempt:
    - Asset: ${assetSymbol}
    - Amount: ${amount}
    - Asset Sentiment: ${sentiment}

    Evaluate this trade for FOMO (Fear Of Missing Out) characteristics based on the user profile provided.
    Return a strict JSON response with exactly the following format:
    {
      "fomoScore": <number between 1 and 100>,
      "aiReasoning": "<string explaining the reasoning>",
      "suggestedAlternative": "<string offering a safer alternative or 'None' if trade is okay>"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a financial advisor AI that strictly outputs JSON. Analyze the trade attempt based on the user\'s financial profile and asset sentiment.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const resultText = response.choices[0].message.content;
    const result = JSON.parse(resultText);

    return result;
  } catch (error) {
    console.error('Error in evaluateTrade:', error);
    throw new Error('Failed to evaluate trade via AI Engine');
  }
};

module.exports = { openai, evaluateTrade };
