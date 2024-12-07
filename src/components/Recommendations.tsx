import React from 'react';
import { Stock, OptimizationRecommendation } from '../types/portfolio';
import { generateRecommendations } from '../utils/optimization';
import { Lightbulb } from 'lucide-react';

interface RecommendationsProps {
  stocks: Stock[];
}

export function Recommendations({ stocks }: RecommendationsProps) {
  const recommendations = generateRecommendations(stocks);
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-yellow-400 mr-2" />
        <h2 className="text-xl font-semibold">Portfolio Recommendations</h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-3"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{rec.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                rec.priority === 'HIGH' 
                  ? 'bg-red-100 text-red-800'
                  : rec.priority === 'MEDIUM'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}>
                {rec.priority} Priority
              </span>
            </div>
            <p className="text-gray-600 mb-2">{rec.description}</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Potential Impact:</span> {rec.potentialImpact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}