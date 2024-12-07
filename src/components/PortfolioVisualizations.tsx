import React from 'react';
import { Stock } from '../types/portfolio';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PortfolioVisualizationsProps {
  stocks: Stock[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function PortfolioVisualizations({ stocks }: PortfolioVisualizationsProps) {
  const plData = stocks.map(stock => ({
    symbol: stock.symbol,
    profitLoss: stock.profitLoss || 0,
    value: stock.totalValue || 0,
  }));

  const pieData = stocks.map(stock => ({
    name: stock.symbol,
    value: stock.totalValue || 0,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-6">Portfolio Analysis</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Profit/Loss by Stock</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="profitLoss"
                  fill="#0088FE"
                  name="Profit/Loss"
                  isAnimationActive={false}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Portfolio Allocation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}