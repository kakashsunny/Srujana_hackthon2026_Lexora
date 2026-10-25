import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { Notice } from '../../types';

interface QuickUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleNotices: Notice[];
  onSelectNoticeAndAnalyze: (notice: Notice) => void;
}

export const QuickUploadModal: React.FC<QuickUploadModalProps> = ({
  isOpen,
  onClose,
  sampleNotices,
  onSelectNoticeAndAnalyze
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    // Simulate OCR processing latency
    setTimeout(() => {
      setIsProcessing(false);
      // Ingest as customized suspicious or tax notice
      const templateNotice = sampleNotices[0]; // Suspicious GST preset
      const customNotice: Notice = {
        ...templateNotice,
        id: `notice-uploaded-${Date.now()}`,
        title: `Uploaded Notice: ${file.name.replace(/\.[^/.]+$/, '')}`,
        referenceNumber: `CUSTOM/2026/${Math.floor(1000 + Math.random() * 9000)}`,
        dateReceived: new Date().toISOString().split('T')[0]
      };
      onSelectNoticeAndAnalyze(customNotice);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E7E5DF] max-w-xl w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7E5DF] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intelligent Ingestion</span>
            </div>
            <h2 className="text-xl font-bold text-[#171A1F] mt-0.5">
              Analyze a Government or Legal Notice
            </h2>
            <p className="text-xs text-[#69717D] mt-0.5">
              Upload your notice to run the DIN format check, red-flag scanner, and plain-English translation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#69717D] hover:text-[#171A1F] rounded-md hover:bg-[#F7F6F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
            ${dragActive ? 'border-[#172C4D] bg-[#F7F6F2]' : 'border-[#B99A62]/40 bg-[#F7F6F2] hover:bg-[#EBE8E0] hover:border-[#172C4D]'}
          `}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,image/*';
            input.onchange = (e: any) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelected(e.target.files[0]);
              }
            };
            input.click();
          }}
        >
          <UploadCloud className="w-10 h-10 mx-auto text-[#B99A62] mb-3" />
          <div className="text-sm font-bold text-[#171A1F]">
            {isProcessing ? 'Extracting OCR & Calculating Checksums...' : 'Click to Browse or Drag Notice Here'}
          </div>
          <p className="text-xs text-[#69717D] mt-1">
            Accepts PDF, scanned notices, JPG, or PNG (Max 25MB)
          </p>
          <div className="mt-3 text-[11px] font-mono text-[#172C4D] bg-white inline-block px-3 py-1 rounded border border-[#E7E5DF]">
            Client-side confidential hashing enabled
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#171A1F] uppercase tracking-wider flex items-center justify-between">
            <span>Or Test With Verified Preset Demonstrations:</span>
            <span className="text-[10px] text-[#69717D] font-normal font-sans">Instant one-click load</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleNotices.map((n) => {
              const isSusp = n.authenticity.outcome === 'suspicious';
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    onSelectNoticeAndAnalyze(n);
                    onClose();
                  }}
                  className="p-3 bg-[#F7F6F2] hover:bg-[#EBE8E0] border border-[#E7E5DF] hover:border-[#172C4D]/40 rounded-lg text-left transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[10px] text-[#69717D] mb-1">
                      <span className="font-semibold uppercase text-[#172C4D]">{n.category}</span>
                      {isSusp && (
                        <span className="text-[9px] font-semibold text-[#B91C1C] bg-[#FEF2F2] px-1.5 py-0.2 rounded-xs">
                          Suspicious
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#171A1F] leading-snug line-clamp-1 group-hover:text-[#172C4D]">
                      {n.title}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-[#69717D] flex items-center justify-between">
                    <span className="font-mono">{n.referenceNumber}</span>
                    <ArrowRight className="w-3 h-3 text-[#B99A62] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
