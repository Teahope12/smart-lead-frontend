import { Lead } from '../../types/lead.types';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      New: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Qualified: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getSourceIcon = (source: string) => {
    const icons = {
      Website: '🌐',
      Instagram: '📸',
      Referral: '👥',
    };
    return icons[source as keyof typeof icons] || '📌';
  };

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm text-gray-900 dark:text-white mt-1 sm:mt-0">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Lead Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{lead.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <InfoRow 
              label="Status" 
              value={
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              } 
            />
            <InfoRow label="Source" value={`${getSourceIcon(lead.source)} ${lead.source}`} />
            <InfoRow label="Created By" value={lead.createdBy?.name || 'Unknown'} />
            <InfoRow label="Created At" value={new Date(lead.createdAt).toLocaleString()} />
            <InfoRow label="Last Updated" value={new Date(lead.updatedAt).toLocaleString()} />
            <InfoRow label="Lead ID" value={lead._id} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};