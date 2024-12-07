import { Stock, OptimizationRecommendation } from '../types/portfolio';
import { calculatePortfolioRisk } from './stressTest';

export function generateRecommendations(stocks: Stock[]): OptimizationRecommendation[] {
  const recommendations: OptimizationRecommendation[] = [];
  const { concentrationRisk, volatilityScore, diversificationScore } = calculatePortfolioRisk(stocks);
  
  if (concentrationRisk) {
    recommendations.push({
      type: 'DIVERSIFICATION',
      title: 'Reduce Position Concentration',
      description: 'Some positions exceed 20% of your portfolio. Consider reducing these positions to minimize risk.',
      priority: 'HIGH',
      potentialImpact: 'Reduced vulnerability to single-stock volatility'
    });
  }
  
  if (diversificationScore < 70) {
    recommendations.push({
      type: 'REBALANCING',
      title: 'Improve Sector Diversification',
      description: 'Your portfolio shows high concentration in specific sectors. Consider adding positions in underrepresented sectors.',
      priority: 'MEDIUM',
      potentialImpact: 'Better risk-adjusted returns through diversification'
    });
  }
  
  if (volatilityScore > 60) {
    recommendations.push({
      type: 'RISK_MANAGEMENT',
      title: 'Reduce Portfolio Volatility',
      description: 'Consider adding more stable, large-cap stocks or bonds to reduce overall portfolio volatility.',
      priority: 'MEDIUM',
      potentialImpact: 'Lower portfolio volatility and more stable returns'
    });
  }
  
  return recommendations;
}