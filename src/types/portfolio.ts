export interface Stock {
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice?: number;
  totalValue?: number;
  profitLoss?: number;
  profitLossPercentage?: number;
}

export interface PortfolioStats {
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export interface StressTestScenario {
  name: string;
  description: string;
  impact: number;
  probability: number;
}

export interface OptimizationRecommendation {
  type: 'DIVERSIFICATION' | 'REBALANCING' | 'RISK_MANAGEMENT';
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  potentialImpact: string;
}