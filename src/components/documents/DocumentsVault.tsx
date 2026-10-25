import React, { useState } from 'react';
import { 
  FolderArchive, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  Download, 
  Plus,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { Notice, RequiredDocument } from '../../types';

interface DocumentsVaultProps {
  notices: Notice[];
  onSelectNotice: (id: string) => void;
}

export const DocumentsVault: React.FC<DocumentsVaultProps> = ({
  notices,
  onSelectNotice
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'collected' | 'pending'>('all');
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  // Flatten all documents across notices
  const allDocs = notices.flatMap(n => 
    n.requiredDocuments.map(d => ({
      ...d,
      noticeId: n.id,
      noticeTitle: n.title,
      noticeRef: n.referenceNumber,
      category: n.category
    }))
  );

  const filteredDocs = allDocs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.noticeRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterStatus === 'collected') return d.isCollected;
    if (filterStatus === 'pending') return !d.isCollected;
    return true;
  });

  const handleSimulateUpload = () => {
    setUploadSuccessToast('Document successfully uploaded & encrypted in company evidentiary vault.');
    setTimeout(() => setUploadSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
            <span>Evidentiary Records Vault</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F] mt-1">
            Documents &amp; Evidence Inventory
          </h1>
          <p className="text-xs text-[#69717D] mt-0.5">
            Maintain tamper-evident audit trails of tax invoices, bank statements, challans, and contractor registers.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Supporting Evidence</span>
        </button>
      </div>

      {uploadSuccessToast && (
        <div className="bg-[#15803D] text-white p-3 rounded-md text-xs font-medium flex items-center justify-between shadow-md">
          <span>✓ {uploadSuccessToast}</span>
          <button onClick={() => setUploadSuccessToast(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E7E5DF] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-[#69717D] absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search documents by name, matter, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F6F2] border border-[#E7E5DF] rounded-md text-[#171A1F] focus:outline-none focus:ring-1 focus:ring-[#172C4D]"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-[#69717D] font-medium mr-1">Status:</span>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'collected', label: 'Collected' },
            { id: 'pending', label: 'Pending Retrieval' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id as any)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filterStatus === f.id
                  ? 'bg-[#172C4D] text-white'
                  : 'bg-[#F7F6F2] text-[#48505E] hover:bg-[#EBE8E0]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase bg-[#F7F6F2] px-2 py-0.5 rounded text-[#172C4D] border border-[#E7E5DF]">
                  {doc.category.toUpperCase()}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                  doc.isCollected ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#FFFBEB] text-[#B45309]'
                }`}>
                  {doc.isCollected ? 'Collected' : 'Pending'}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#171A1F] line-clamp-2">
                {doc.name}
              </h3>
              <p className="text-xs text-[#69717D] mt-1 line-clamp-2">
                {doc.description}
              </p>

              <div className="mt-3 pt-2 border-t border-[#E7E5DF] text-[11px] text-[#48505E]">
                <strong>Associated Matter:</strong>
                <div className="truncate font-mono text-[#172C4D]">{doc.noticeRef}</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E7E5DF] flex items-center justify-between">
              <button
                onClick={() => onSelectNotice(doc.noticeId)}
                className="text-xs text-[#172C4D] hover:underline font-semibold"
              >
                View Notice
              </button>

              <button
                onClick={() => alert(`Simulated Download: ${doc.name} encrypted bundle ready.`)}
                className="p-1.5 text-[#69717D] hover:text-[#171A1F] rounded hover:bg-[#F7F6F2]"
                title="Download Evidence"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
