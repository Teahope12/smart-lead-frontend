import { api } from './api';
import { Lead, LeadInput, LeadFilters, PaginatedLeadsResponse } from '../types/lead.types';

export const leadService = {
  async getLeads(filters: LeadFilters): Promise<PaginatedLeadsResponse> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/leads?${params.toString()}`);
    return response.data.data;
  },

  async getLeadById(id: string): Promise<Lead> {
    const response = await api.get(`/leads/${id}`);
    return response.data.data;
  },

  async createLead(leadData: LeadInput): Promise<Lead> {
    const response = await api.post('/leads', leadData);
    return response.data.data;
  },

  async updateLead(id: string, leadData: Partial<LeadInput>): Promise<Lead> {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async exportLeads(filters: Omit<LeadFilters, 'page' | 'limit'>): Promise<void> {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    
    console.log('Exporting with filters:', filters);
    
    const response = await api.get(`/leads/export?${params.toString()}`, {
      responseType: 'blob',
      timeout: 30000, // 30 seconds timeout
    });
    
    console.log('Export response:', response);
    
    // Create blob and download
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return Promise.resolve();
  } catch (error: any) {
    console.error('Export error details:', error);
    console.error('Error response:', error.response);
    
    // Try to parse error message from blob response
    if (error.response?.data instanceof Blob) {
      const text = await error.response.data.text();
      console.error('Error blob text:', text);
      throw new Error(JSON.parse(text).message || 'Export failed');
    }
    
    throw error;
  }
},
};