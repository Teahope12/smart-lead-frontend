import React from 'react';

interface StatusChartProps {
  data: {
    status: string;
    count: number;
    percentage: number;
    color: string;
  }[];
}

export const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Leads by Status
      </h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.status}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{item.status}</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {item.count} ({item.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};