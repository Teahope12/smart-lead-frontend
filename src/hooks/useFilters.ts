import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface FiltersState {
  status?: string;
  source?: string;
  search?: string;
  sort?: 'latest' | 'oldest';
  page: number;
}

export const useFilters = (initialFilters: FiltersState) => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const updateFilters = useCallback((newFilters: Partial<FiltersState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, [initialFilters]);

  return {
    filters: { ...filters, search: debouncedSearch },
    searchTerm,
    setSearchTerm,
    updateFilters,
    resetFilters,
  };
};