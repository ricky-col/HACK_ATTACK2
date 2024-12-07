import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PortfolioTable } from './components/PortfolioTable';
import { PortfolioVisualizations } from './components/PortfolioVisualizations';
import { StressTest } from './components/StressTest';
import { Recommendations } from './components/Recommendations';
import { Stock } from './types/portfolio';
import { BarChart } from 'lucide-react';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  const handleDataUpload = async (data: Stock[]) => {
    // Simulate fetching current prices
    const updatedStocks = data.map(stock => ({
      ...stock,
      currentPrice: stock.purchasePrice * (1 + (Math.random() * 0.4 - 0.2)), // ±20% variation
    })).map(stock => ({
      ...stock,
      totalValue: stock.quantity * (stock.currentPrice || 0),
      profitLoss: stock.quantity * ((stock.currentPrice || 0) - stock.purchasePrice),
      profitLossPercentage: ((stock.currentPrice || 0) - stock.purchasePrice) / stock.purchasePrice * 100,
    }));

    setStocks(updatedStocks);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-8">
            <BarChart className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Stock Portfolio Analyzer</h1>
          </div>
          
          {stocks.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6">
              <FileUpload onDataUpload={handleDataUpload} />
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow">
                <PortfolioTable stocks={stocks} />
              </div>
              <PortfolioVisualizations stocks={stocks} />
              <StressTest stocks={stocks} />
              <Recommendations stocks={stocks} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;