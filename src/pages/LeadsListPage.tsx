import { useEffect, useState } from 'react';
import { useLeads } from '../contexts/LeadContext';
import { useAuth } from '../contexts/AuthContext';
import { LeadFiltersComponent } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadDetailModal } from '../components/leads/LeadDetailModal';
import { Pagination } from '../components/leads/Pagination';
import { ExportButton } from '../components/leads/ExportButton';
import { Lead } from '../types/lead.types';

export const LeadsListPage = () => {
  const { user } = useAuth();
  const { 
    leads, 
    pagination, 
    loading, 
    filters, 
    setFilters, 
    fetchLeads, 
    createLead, 
    updateLead, 
    deleteLead,
    exportLeads
  } = useLeads();
  
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleCreateLead = async (data: any) => {
    await createLead(data);
    setShowForm(false);
  };

  const handleUpdateLead = async (data: any) => {
    if (editingLead) {
      await updateLead(editingLead._id, data);
      setEditingLead(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      await deleteLead(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Leads Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track all your leads in one place
            </p>
          </div>
          <div className="flex gap-3">
            <ExportButton filters={{ 
              status: filters.status, 
              source: filters.source, 
              search: filters.search, 
              sort: filters.sort 
            }} />
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center gap-2"
            >
              + Create Lead
            </button>
          </div>
        </div>

        {/* Filters */}
        <LeadFiltersComponent filters={filters} onFilterChange={handleFilterChange} />

        {/* Leads Table */}
        <LeadTable
          leads={leads}
          loading={loading}
          onEdit={setEditingLead}
          onDelete={handleDeleteLead}
          onView={setViewingLead}
        />

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalLeads={pagination.totalLeads}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        )}

        {/* Create/Edit Form Modal */}
        {(showForm || editingLead) && (
          <LeadForm
            initialData={editingLead || undefined}
            onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
            onClose={() => {
              setShowForm(false);
              setEditingLead(null);
            }}
          />
        )}

        {/* View Details Modal */}
        {viewingLead && (
          <LeadDetailModal
            lead={viewingLead}
            onClose={() => setViewingLead(null)}
          />
        )}
      </div>
    </div>
  );
};