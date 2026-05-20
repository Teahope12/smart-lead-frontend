import { useState } from 'react';
import { leadService } from '../../services/lead.service';
import { LeadFilters } from '../../types/lead.types';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  filters: Omit<LeadFilters, 'page' | 'limit'>;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ filters }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    toast.loading('Preparing export...', { id: 'export' });
    
    try {
      await leadService.exportLeads(filters);
      toast.success('Leads exported successfully!', { id: 'export' });
    } catch (error: any) {
      console.error('Export error:', error);
      toast.error(error.message || 'Failed to export leads', { id: 'export' });
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {exporting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Exporting...
        </>
      ) : (
        <>
          📥 Export CSV
        </>
      )}
    </button>
  );
};