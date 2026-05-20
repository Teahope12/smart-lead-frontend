import React from 'react';
import { Link } from 'react-router-dom';

interface RecentActivityProps {
  activities: {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
    createdBy: {
      name: string;
    };
  }[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusBadge = (status: string) => {
    const colors = {
      New: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Qualified: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <Link
            key={activity._id}
            to={`/leads/${activity._id}`}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">{activity.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.email} • {activity.source} • Created by {activity.createdBy?.name}
              </div>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              {new Date(activity.createdAt).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};