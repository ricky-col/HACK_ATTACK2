import { Stock, StressTestScenario } from '../types/portfolio';

export const scenarios: StressTestScenario[] = [
  {
    name: 'Market Crash',
    description: 'Severe market downturn similar to 2008 crisis',
    impact: -0.40,
    probability: 0.05
  },
  {
    name: 'Economic Recession',
    description: 'Prolonged economic slowdown',
    impact: -0.25,
    probability: 0.15
  },
  {
    name: 'Interest Rate Hike',
    description: 'Significant increase in interest rates',
    impact: -0.15,
    probability: 0.30
  }
];

export function calculateStressTestImpact(stocks: Stock[], scenario: StressTestScenario) {
  return stocks.map(stock => ({
    ...stock,
    stressedPrice: (stock.currentPrice || 0) * (1 + scenario.impact),
    stressedValue: stock.quantity * ((stock.currentPrice || 0) * (1 + scenario.impact)),
    potentialLoss: stock.quantity * ((stock.currentPrice || 0) * scenario.impact)
  }));
}

export function calculatePortfolioRisk(stocks: Stock[]) {
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.totalValue || 0), 0);
  const concentrationRisk = stocks.some(stock => 
    (stock.totalValue || 0) / totalValue > 0.2
  );
  
  return {
    concentrationRisk,
    volatilityScore: calculateVolatilityScore(stocks),
    diversificationScore: calculateDiversificationScore(stocks)
  };
}

function calculateVolatilityScore(stocks: Stock[]): number {
  // Simple volatility score based on price changes
  const priceChanges = stocks.map(stock => 
    Math.abs((stock.profitLossPercentage || 0) / 100)
  );
  
  // Calculate average manually
  const sum = priceChanges.reduce((acc, val) => acc + val, 0);
  const average = priceChanges.length > 0 ? sum / priceChanges.length : 0;
  
  return Math.min(Math.max(average * 100, 0), 100);
}

function calculateDiversificationScore(stocks: Stock[]): number {
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.totalValue || 0), 0);
  const weights = stocks.map(stock => (stock.totalValue || 0) / totalValue);
  const idealWeight = 1 / stocks.length;
  
  // Calculate how far the portfolio is from equal distribution
  const weightDeviation = weights.reduce(
    (sum, weight) => sum + Math.abs(weight - idealWeight),
    0
  );
  
  return Math.max(100 - (weightDeviation * 100), 0);
}