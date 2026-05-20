import { useAuth } from '../contexts/AuthContext';
import { useLeads } from '../contexts/LeadContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  TotalLeadsIcon,
  NewLeadsIcon,
  ContactedIcon,
  QualifiedIcon,
  LostIcon,
  PlusIcon,
  ListIcon,
  AnalyticsIcon,
  ArrowRightIcon,
  CalendarIcon,
  UserIcon,
  MailIcon
} from '../components/icons/Icons';

export const Dashboard = () => {
  const { user } = useAuth();
  const { leads, fetchLeads, loading } = useLeads();
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    qualifiedLeads: 0,
    lostLeads: 0,
    recentLeads: [] as any[]
  });

  useEffect(() => {
    fetchLeads({ page: 1 });
  }, []);

  useEffect(() => {
    if (leads) {
      const newLeads = leads.filter(l => l.status === 'New').length;
      const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
      const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
      const lostLeads = leads.filter(l => l.status === 'Lost').length;
      
      setStats({
        totalLeads: leads.length,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        lostLeads,
        recentLeads: leads.slice(0, 5)
      });
    }
  }, [leads]);

  const statsCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: TotalLeadsIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      icon: NewLeadsIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Contacted',
      value: stats.contactedLeads,
      icon: ContactedIcon,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Qualified',
      value: stats.qualifiedLeads,
      icon: QualifiedIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Lost',
      value: stats.lostLeads,
      icon: LostIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Lead',
      description: 'Add a new lead to your pipeline',
      icon: PlusIcon,
      path: '/leads',
      action: 'create',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View All Leads',
      description: 'Manage and filter your leads',
      icon: ListIcon,
      path: '/leads',
      action: 'view',
      color: 'from-gray-500 to-gray-600'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your performance metrics',
      icon: AnalyticsIcon,
      path: '/analytics',
      action: 'view',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      New: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      Qualified: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      Lost: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      New: <NewLeadsIcon size={14} className="inline" />,
      Contacted: <ContactedIcon size={14} className="inline" />,
      Qualified: <QualifiedIcon size={14} className="inline" />,
      Lost: <LostIcon size={14} className="inline" />
    };
    return icons[status as keyof typeof icons] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your leads today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className={stat.textColor} size={32} />
                  <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
                </div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stat.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Quick Actions & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.path}
                      className="block group"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRightIcon className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" size={20} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

       {/* Recent Activity */}
<div className="lg:col-span-2">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Recent Activity
      </h2>
      <Link
        to="/leads"
        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
      >
        View All <ArrowRightIcon size={14} />
      </Link>
    </div>
    
    {loading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ) : stats.recentLeads.length === 0 ? (
      <div className="text-center py-8">
        <div className="text-5xl mb-3 opacity-50">📋</div>
        <p className="text-gray-500 dark:text-gray-400">No leads yet. Create your first lead!</p>
        <Link
          to="/leads"
          className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Create Lead
        </Link>
      </div>
    ) : (
      <div className="space-y-3">
        {stats.recentLeads.map((lead) => (
          <Link
            key={lead._id}
            to={`/leads`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {lead.name}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${getStatusBadge(lead.status)}`}>
                    {getStatusIcon(lead.status)}
                    {lead.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="flex items-center gap-1 truncate">
                    <MailIcon size={12} className="flex-shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </span>
                  <span className="flex items-center gap-1 flex-shrink-0">
                    <CalendarIcon size={12} />
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <ArrowRightIcon className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 ml-2 flex-shrink-0" size={18} />
          </Link>
        ))}
      </div>
    )}
  </div>
</div>
        </div>

        {/* Pipeline Overview Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Lead Pipeline Overview</h3>
              <p className="text-blue-100 text-sm">
                You have {stats.totalLeads} total leads in your pipeline.
                {stats.qualifiedLeads > 0 && ` ${stats.qualifiedLeads} are qualified!`}
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.newLeads}</div>
                <div className="text-xs text-blue-100">New</div>
              </div>
              <div className="w-px h-10 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.contactedLeads}</div>
                <div className="text-xs text-blue-100">Contacted</div>
              </div>
              <div className="w-px h-10 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.qualifiedLeads}</div>
                <div className="text-xs text-blue-100">Qualified</div>
              </div>
              <div className="w-px h-10 bg-blue-400"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.lostLeads}</div>
                <div className="text-xs text-blue-100">Lost</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};