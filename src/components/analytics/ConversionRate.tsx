import React from 'react';

interface ConversionRateProps {
  total: number;
  qualified: number;
  lost: number;
  rate: number;
}

export const ConversionRate: React.FC<ConversionRateProps> = ({ total, qualified, lost, rate }) => {
  const qualifiedPercentage = total > 0 ? (qualified / total) * 100 : 0;
  const lostPercentage = total > 0 ? (lost / total) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Conversion Rate
      </h3>
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
          {rate.toFixed(1)}%
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Qualified Leads</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Qualified</span>
          <span className="font-medium text-gray-900 dark:text-white">{qualified} ({qualifiedPercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${qualifiedPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-3">
          <span className="text-gray-600 dark:text-gray-400">Lost</span>
          <span className="font-medium text-gray-900 dark:text-white">{lost} ({lostPercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${lostPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};