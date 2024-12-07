import React from 'react';
import { Stock } from '../types/portfolio';
import { scenarios, calculateStressTestImpact } from '../utils/stressTest';
import { AlertTriangle } from 'lucide-react';

interface StressTestProps {
  stocks: Stock[];
}

export function StressTest({ stocks }: StressTestProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold">Stress Test Scenarios</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map(scenario => {
          const impactedStocks = calculateStressTestImpact(stocks, scenario);
          const totalLoss = impactedStocks.reduce(
            (sum, stock) => sum + (stock.potentialLoss || 0),
            0
          );
          
          return (
            <div key={scenario.name} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{scenario.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Probability:</span>
                  <span className="text-sm font-medium">
                    {(scenario.probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Potential Impact:</span>
                  <span className="text-sm font-medium text-red-600">
                    ${Math.abs(totalLoss).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}