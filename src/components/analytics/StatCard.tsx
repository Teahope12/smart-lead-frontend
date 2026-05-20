import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color?: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'blue', suffix = '' }) => {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}{suffix}
          </p>
        </div>
        <div className={`text-4xl ${colors[color as keyof typeof colors]} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};