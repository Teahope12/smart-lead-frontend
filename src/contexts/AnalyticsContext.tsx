import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface AnalyticsData {
  totalLeads: number;
  leadsByStatus: { status: string; count: number; percentage: number; color: string }[];
  leadsBySource: { source: string; count: number; percentage: number; icon: string }[];
  leadsByMonth: { month: string; count: number; year: number }[];
  recentActivity: any[];
  conversionRate: { total: number; qualified: number; lost: number; rate: number };
  averageLeadsPerDay: number;
  topPerformers: { userId: string; name: string; leadCount: number }[];
  trends: { daily: any[]; weekly: any[]; monthly: any[] };
}

const AnalyticsContext = createContext<{
  analytics: AnalyticsData | null;
  loading: boolean;
  fetchAnalytics: () => Promise<void>;
} | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};

export const AnalyticsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.get('/analytics');
      setAnalytics(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ analytics, loading, fetchAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};