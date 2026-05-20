import React, { createContext, useContext, useState, ReactNode } from 'react';
import { leadService } from '../services/lead.service';
import { Lead, LeadFilters, PaginatedLeadsResponse } from '../types/lead.types';
import toast from 'react-hot-toast';

interface LeadContextType {
  leads: Lead[];
  pagination: PaginatedLeadsResponse['pagination'] | null;
  loading: boolean;
  filters: LeadFilters;
  fetchLeads: (filters?: LeadFilters) => Promise<void>;
  createLead: (leadData: any) => Promise<void>;
  updateLead: (id: string, leadData: any) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  setFilters: (filters: LeadFilters) => void;
  exportLeads: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within LeadProvider');
  }
  return context;
};

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<PaginatedLeadsResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    sort: 'latest',
    limit: 10
  });

  const fetchLeads = async (newFilters?: LeadFilters) => {
    setLoading(true);
    try {
      const currentFilters = newFilters || filters;
      const response = await leadService.getLeads(currentFilters);
      setLeads(response.leads);
      setPagination(response.pagination);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData: any) => {
    try {
      await leadService.createLead(leadData);
      toast.success('Lead created successfully');
      await fetchLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create lead');
      throw error;
    }
  };

  const updateLead = async (id: string, leadData: any) => {
    try {
      await leadService.updateLead(id, leadData);
      toast.success('Lead updated successfully');
      await fetchLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
      throw error;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await leadService.deleteLead(id);
      toast.success('Lead deleted successfully');
      await fetchLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
      throw error;
    }
  };

  const exportLeads = async () => {
    try {
      const { page, limit, ...exportFilters } = filters;
      await leadService.exportLeads(exportFilters);
      toast.success('Leads exported successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to export leads');
    }
  };

  return (
    <LeadContext.Provider value={{
      leads,
      pagination,
      loading,
      filters,
      fetchLeads,
      createLead,
      updateLead,
      deleteLead,
      setFilters,
      exportLeads
    }}>
      {children}
    </LeadContext.Provider>
  );
};