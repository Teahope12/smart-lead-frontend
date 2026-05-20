import React from 'react';

interface SourceChartProps {
  data: {
    source: string;
    count: number;
    percentage: number;
    icon: string;
  }[];
}

export const SourceChart: React.FC<SourceChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Leads by Source
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => (
          <div key={item.source} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-900 dark:text-white font-medium">{item.source}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{item.count}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{item.percentage.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};