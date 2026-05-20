import React from 'react';

interface TopPerformersProps {
  performers: {
    userId: string;
    name: string;
    leadCount: number;
  }[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ performers }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Performers
      </h3>
      <div className="space-y-3">
        {performers.map((performer, index) => (
          <div key={performer.userId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{performer.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Leads created</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {performer.leadCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};