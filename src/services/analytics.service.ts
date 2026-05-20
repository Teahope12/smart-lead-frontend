import { api } from './api';
import { AnalyticsData } from '../types/analytics.types';

export const analyticsService = {
  async getAnalytics(): Promise<AnalyticsData> {
    const response = await api.get('/analytics');
    return response.data.data;
  }
};