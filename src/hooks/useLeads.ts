import { useLeads as useLeadsContext } from '../contexts/LeadContext';

export const useLeads = () => {
  return useLeadsContext();
};