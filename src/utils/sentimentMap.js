const sentimentMap = {
  DOGE: 'Extreme Hype',
  PEPE: 'Extreme Hype',
  SHIB: 'Extreme Hype',
  GME: 'Extreme Hype',
  AMC: 'Extreme Hype',
  TSLA: 'High Hype',
  BTC: 'Moderate Hype',
  ETH: 'Moderate Hype',
  RELIANCE: 'Stable',
  HDFC: 'Stable',
  TCS: 'Stable',
  AAPL: 'Stable',
  MSFT: 'Stable',
};

const getSentiment = (symbol) => {
  return sentimentMap[symbol.toUpperCase()] || 'Neutral';
};

module.exports = { sentimentMap, getSentiment };
