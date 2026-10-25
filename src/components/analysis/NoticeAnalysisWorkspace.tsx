import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Search, 
  AlertCircle, 
  Languages, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  BookOpen,
  Lock,
  Layers
} from 'lucide-react';
import { Notice, SupportedLanguage } from '../../types';
import { 
  SUPPORTED_LANGUAGES, 
  getNoticeTranslation, 
  extractProtectedEntities,
  detectDocumentLanguage
} from '../../services/multilingualEngine';
import { useAuth } from '../../context/AuthContext';
import { Trash2 } from 'lucide-react';

interface NoticeAnalysisWorkspaceProps {
  notice: Notice;
  onNavigateToResponse: () => void;
  onNavigateToLab: () => void;
  onNavigateToProfessional: () => void;
  onToggleActionItem: (noticeId: string, actionId: string) => void;
  onDeleteNotice?: (noticeId: string) => void;
}

export const NoticeAnalysisWorkspace: React.FC<NoticeAnalysisWorkspaceProps> = ({
  notice,
  onNavigateToResponse,
  onNavigateToLab,
  onNavigateToProfessional,
  onToggleActionItem,
  onDeleteNotice
}) => {
  const { canDeleteNotice, currentRole } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showRawOcr, setShowRawOcr] = useState<boolean>(false);
  const [documentSearch, setDocumentSearch] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<'plain' | 'glossary' | 'actions' | 'citations' | 'documents'>('plain');

  const isSuspicious = notice.authenticity.outcome === 'suspicious';

  // Language auto-detection details
  const detectedLanguage = notice.detectedLanguage || detectDocumentLanguage(notice.extractedOcrText);

  // Active translation
  const translation = getNoticeTranslation(notice, selectedLanguage);

  // Protected statutory entities that must never be modified
  const protectedEntities = extractProtectedEntities(notice);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#69717D]">
            <span className="font-semibold text-[#172C4D] uppercase">{notice.category}</span>
            <span>·</span>
            <span className="font-mono">{notice.referenceNumber}</span>
          </div>
          <h1 className="text-xl font-bold text-[#171A1F] mt-0.5">
            {notice.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isSuspicious ? (
            <button
              onClick={onNavigateToLab}
              className="px-3 py-1.5 bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] hover:bg-[#FEE2E2] rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Suspicious (Open Lab)</span>
            </button>
          ) : notice.authenticity.outcome === 'unable_to_verify' ? (
            <button
              onClick={onNavigateToLab}
              className="px-3 py-1.5 bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] hover:bg-[#FEF3C7] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Requires Direct Verification (Open Lab)</span>
            </button>
          ) : (
            <button
              onClick={onNavigateToLab}
              className="px-3 py-1.5 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] hover:bg-[#DCFCE7] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Appears Genuine (Open Lab)</span>
            </button>
          )}

          <button
            onClick={onNavigateToResponse}
            className="px-3.5 py-1.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Prepare Response</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Role-Gated Delete Action (Owner Only) */}
          {canDeleteNotice ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1.5 border border-[#E7E5DF] hover:border-[#B91C1C] hover:bg-[#FEF2F2] rounded-md text-[#69717D] hover:text-[#B91C1C] transition-colors cursor-pointer"
              title="Delete Notice (Owner permission)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => alert(`Deletion Restricted: You are currently active as ${currentRole.toUpperCase()}. Only the business Owner (Rajesh Sharma) has permission to delete notice records.`)}
              className="p-1.5 border border-[#E7E5DF] bg-gray-100 rounded-md text-gray-400 cursor-not-allowed"
              title="Deletion Restricted: Owner permission required"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal for Owner */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E7E5DF] max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#B91C1C] font-bold text-sm">
              <Trash2 className="w-4 h-4" />
              <span>Confirm Notice Deletion</span>
            </div>
            <p className="text-xs text-[#48505E] leading-relaxed">
              Are you sure you want to delete <strong>{notice.referenceNumber}</strong> ({notice.title})? This will remove its forensic audit trail and response drafts.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-xs text-[#69717D] hover:text-[#171A1F] rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  if (onDeleteNotice) onDeleteNotice(notice.id);
                }}
                className="px-3 py-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-md shadow-xs"
              >
                Delete Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multilingual Intelligence Banner with Auto-Detection */}
      <div className="bg-[#FAF8F3] border border-[#D0C9B6] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg border border-[#E7E5DF] text-[#B99A62] shrink-0 mt-0.5">
            <Languages className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#171A1F]">Document Language Auto-Detection</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#172C4D] text-white">
                {detectedLanguage.languageName} ({detectedLanguage.confidence}%)
              </span>
              {detectedLanguage.isBilingual && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#B99A62] text-white">
                  Bilingual Notice
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#69717D] mt-0.5">
              {detectedLanguage.details}. All statutory citations, DINs, and amounts are strictly preserved across translations.
            </p>
          </div>
        </div>

        {/* Language Selector Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#69717D] font-medium hidden sm:inline">Translate To:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
            className="px-3 py-1.5 bg-white border border-[#E7E5DF] text-xs font-semibold text-[#171A1F] rounded-md focus:outline-none focus:ring-1 focus:ring-[#172C4D] shadow-2xs cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Split-View Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Document Viewer (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E5DF] shadow-xs overflow-hidden flex flex-col h-[750px]">
          {/* Document Controls Toolbar */}
          <div className="p-3 border-b border-[#E7E5DF] bg-[#F7F6F2] flex items-center justify-between gap-2 text-xs">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-[#E7E5DF]">
              <button
                onClick={() => setShowRawOcr(false)}
                className={`px-2 py-1 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${!showRawOcr ? 'bg-[#172C4D] text-white' : 'text-[#69717D] hover:text-[#171A1F]'}`}
              >
                Rendered Notice
              </button>
              <button
                onClick={() => setShowRawOcr(true)}
                className={`px-2 py-1 text-[11px] font-medium rounded-xs transition-colors cursor-pointer ${showRawOcr ? 'bg-[#172C4D] text-white' : 'text-[#69717D] hover:text-[#171A1F]'}`}
              >
                Extracted OCR
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 text-[#69717D]">
              <button
                onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                className="p-1 hover:text-[#171A1F] hover:bg-white rounded cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-9 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                className="p-1 hover:text-[#171A1F] hover:bg-white rounded cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* In-Document Search Bar */}
          <div className="p-2 border-b border-[#E7E5DF] bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#69717D] absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Find text in document..."
                value={documentSearch}
                onChange={(e) => setDocumentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-[#F7F6F2] border border-[#E7E5DF] rounded text-[#171A1F] focus:outline-none focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>
          </div>

          {/* Document Canvas Preview */}
          <div className="flex-1 overflow-auto p-4 bg-[#EDEAE3] flex justify-center">
            {showRawOcr ? (
              <pre className="w-full bg-white p-5 font-mono text-[11px] text-[#171A1F] leading-relaxed whitespace-pre-wrap rounded border border-[#D7D4CC] shadow-inner">
                {notice.extractedOcrText}
              </pre>
            ) : (
              <div 
                className="bg-white p-6 rounded shadow-md border border-[#D7D4CC] max-w-full transition-transform origin-top text-xs space-y-4"
                style={{ transform: `scale(${zoomLevel / 100})`, width: '100%', minHeight: '650px' }}
              >
                {/* Government Letterhead Representation */}
                <div className="text-center border-b pb-3 border-[#171A1F]/20 space-y-1">
                  <div className="text-[10px] tracking-widest font-serif uppercase text-[#48505E]">
                    GOVERNMENT OF INDIA / STATE JURISDICTION
                  </div>
                  <div className="text-sm font-bold font-serif text-[#171A1F]">
                    {notice.issuingAuthority.name.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-[#69717D]">
                    {notice.issuingAuthority.department}
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-b pb-3 border-[#E7E5DF]">
                  <div>
                    <span className="text-[#69717D]">Notice Ref: </span>
                    <span className="font-bold text-[#171A1F]">{notice.referenceNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#69717D]">Date of Issue: </span>
                    <span className="font-bold">{notice.dateIssued}</span>
                  </div>
                  {notice.din && (
                    <div className="col-span-2">
                      <span className="text-[#69717D]">DIN: </span>
                      <span className={`font-bold ${isSuspicious ? 'bg-[#FEF2F2] text-[#B91C1C] px-1 rounded' : 'text-[#171A1F]'}`}>
                        {notice.din} {isSuspicious ? '(Check failed)' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Recipient Box */}
                <div className="text-[11px] text-[#171A1F] bg-[#F7F6F2] p-2.5 rounded border border-[#E7E5DF]">
                  <div className="text-[10px] uppercase text-[#69717D] font-semibold">To:</div>
                  <div className="font-bold">{notice.recipientName}</div>
                  <div className="font-mono text-[10px] text-[#69717D]">ID/GSTIN: {notice.recipientGstinOrPan}</div>
                </div>

                {/* Body Content with Forensic Highlights */}
                <div className="text-[11px] text-[#2C313A] leading-relaxed space-y-2">
                  <div className="font-bold text-[#171A1F]">
                    SUBJECT: {notice.title}
                  </div>
                  <p>
                    Whereas on scrutiny of the record, the undersigned has reasons to believe that there has been an irregularity or inquiry required under the statutory provisions referenced herein.
                  </p>
                  
                  {notice.demandAmountInr && (
                    <div className="p-2 bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-medium rounded">
                      Demand / Discrepancy Amount: <span className="font-mono font-bold">₹{notice.demandAmountInr.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {isSuspicious && (
                    <div className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-[11px] text-[#B91C1C] space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>High-Risk Red-Flag Clause in Notice:</span>
                      </div>
                      <div className="font-mono text-[10px] bg-white p-1.5 rounded border border-[#FECACA]">
                        "For expedited clearance, scan the settlement QR code below or transfer penalty directly to settlement UPI: gstin.recovery.dept@okaxis"
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-[#69717D] italic pt-2">
                    Response required strictly on or before <strong className="text-[#171A1F]">{notice.responseDeadline}</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Plain-Language Intelligence (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Notice At A Glance Grid */}
          <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs">
            <h2 className="text-xs font-bold text-[#171A1F] uppercase tracking-wider mb-3">
              Notice At A Glance
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-[#F7F6F2] rounded-md border border-[#E7E5DF]">
                <div className="text-[10px] text-[#69717D]">Issuing Office</div>
                <div className="font-bold text-[#171A1F] truncate mt-0.5">{notice.issuingAuthority.name}</div>
              </div>

              <div className="p-2.5 bg-[#F7F6F2] rounded-md border border-[#E7E5DF]">
                <div className="text-[10px] text-[#69717D]">Response Deadline</div>
                <div className="font-bold font-mono text-[#B91C1C] mt-0.5">{notice.responseDeadline}</div>
              </div>

              <div className="p-2.5 bg-[#F7F6F2] rounded-md border border-[#E7E5DF]">
                <div className="text-[10px] text-[#69717D]">Authenticity Status</div>
                <div className={`font-bold mt-0.5 ${isSuspicious ? 'text-[#B91C1C]' : 'text-[#15803D]'}`}>
                  {isSuspicious ? 'Suspicious' : 'No Red Flags'}
                </div>
              </div>

              <div className="p-2.5 bg-[#F7F6F2] rounded-md border border-[#E7E5DF]">
                <div className="text-[10px] text-[#69717D]">Recommended Expert</div>
                <div className="font-bold text-[#172C4D] mt-0.5 truncate">{notice.recommendedProfessional}</div>
              </div>
            </div>
          </div>

          {/* Strict Entity Preservation Badge Bar */}
          <div className="p-3 bg-white rounded-xl border border-[#E7E5DF] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#171A1F] flex items-center gap-1.5 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-[#B99A62]" />
                <span>Strictly Preserved Legal &amp; Numerical Entities:</span>
              </span>
              <span className="text-[10px] text-[#69717D]">Never translated or rounded</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {protectedEntities.map((ent, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#F7F6F2] border border-[#E7E5DF] text-[#172C4D]"
                >
                  {ent.raw}
                </span>
              ))}
            </div>
          </div>

          {/* Tab Navigation for Intelligence Sections */}
          <div className="flex items-center gap-1 border-b border-[#E7E5DF] text-xs pb-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('plain')}
              className={`px-3 py-1.5 font-medium border-b-2 -mb-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'plain'
                  ? 'border-[#172C4D] text-[#172C4D] font-bold'
                  : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
              }`}
            >
              Plain Explanation ({translation.languageLabel})
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-3 py-1.5 font-medium border-b-2 -mb-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'glossary'
                  ? 'border-[#172C4D] text-[#172C4D] font-bold'
                  : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
              }`}
            >
              Legal Terminology Simplifier ({translation.glossary.length})
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-3 py-1.5 font-medium border-b-2 -mb-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'actions'
                  ? 'border-[#172C4D] text-[#172C4D] font-bold'
                  : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
              }`}
            >
              Action Checklist ({notice.actionItems.length})
            </button>
            <button
              onClick={() => setActiveTab('citations')}
              className={`px-3 py-1.5 font-medium border-b-2 -mb-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'citations'
                  ? 'border-[#172C4D] text-[#172C4D] font-bold'
                  : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
              }`}
            >
              Legal Sections ({notice.legalCitations.length})
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 font-medium border-b-2 -mb-1 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'documents'
                  ? 'border-[#172C4D] text-[#172C4D] font-bold'
                  : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
              }`}
            >
              Enclosures ({notice.requiredDocuments.length})
            </button>
          </div>

          {/* TAB 1: Plain-Language Explanation */}
          {activeTab === 'plain' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DF]">
                  <h3 className="text-sm font-bold text-[#171A1F]">
                    {translation.title}
                  </h3>
                  <span className="text-[11px] text-[#69717D] font-mono">
                    Target: {translation.languageLabel}
                  </span>
                </div>

                <div className="text-xs text-[#2C313A] leading-relaxed p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E7E5DF] space-y-2">
                  <div className="text-[10px] uppercase font-semibold text-[#B99A62]">
                    Core Document Summary
                  </div>
                  <p className="leading-relaxed font-sans">{translation.plainSummary}</p>
                </div>

                {/* Why did you receive it? */}
                <div>
                  <h4 className="text-xs font-bold text-[#171A1F] uppercase tracking-wider mb-1">
                    Why Did Your Business Receive It?
                  </h4>
                  <p className="text-xs text-[#48505E] leading-relaxed">
                    {translation.whyReceived}
                  </p>
                </div>

                {/* Urgency Note */}
                {translation.urgencyNote && (
                  <div className="p-3 bg-[#FEF3C7]/40 border border-[#FDE68A] rounded-lg text-xs text-[#92400E]">
                    <strong>Statutory Timeline:</strong> {translation.urgencyNote}
                  </div>
                )}

                {/* Professional Handoff Callout */}
                <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#B99A62]/30 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#172C4D] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#B99A62]" />
                      <span>Recommended Professional: {notice.recommendedProfessional}</span>
                    </div>
                    <p className="text-[11px] text-[#69717D]">
                      {notice.professionalReason}
                    </p>
                  </div>
                  <button
                    onClick={onNavigateToProfessional}
                    className="px-3 py-1.5 bg-[#172C4D] text-white text-[11px] font-semibold rounded-md hover:bg-[#112038] shrink-0 cursor-pointer"
                  >
                    Consult Expert
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Legal Terminology Simplifier */}
          {activeTab === 'glossary' && (
            <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#171A1F] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#B99A62]" />
                  <span>Legal Terminology Simplifier ({translation.languageLabel})</span>
                </h3>
                <p className="text-xs text-[#69717D] mt-0.5">
                  Complex Indian administrative and judicial legal terms decoded into clear, plain-language business implications.
                </p>
              </div>

              <div className="space-y-3">
                {translation.glossary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E7E5DF] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-[#172C4D]">{item.term}</span>
                      {item.statuteReference && (
                        <span className="text-[10px] font-mono text-[#69717D] bg-white px-2 py-0.5 rounded border border-[#E7E5DF]">
                          {item.statuteReference}
                        </span>
                      )}
                    </div>
                    <p className="text-[#48505E] leading-relaxed">
                      {item.simpleExplanation}
                    </p>
                    {item.term !== item.originalTerm && (
                      <div className="text-[10px] text-[#868E96] font-mono">
                        Original Statutory Term: {item.originalTerm}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Action Checklist */}
          {activeTab === 'actions' && (
            <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#171A1F]">
                Step-by-Step Response Checklist
              </h3>
              <p className="text-xs text-[#69717D]">
                Complete these actions before the deadline to ensure statutory rights are preserved.
              </p>

              <div className="space-y-2 pt-2">
                {notice.actionItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onToggleActionItem(notice.id, item.id)}
                    className="p-3 bg-[#F7F6F2] hover:bg-[#EBE8E0] rounded-lg border border-[#E7E5DF] flex items-start gap-3 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#172C4D] focus:ring-0 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className={`font-medium ${item.completed ? 'line-through text-[#69717D]' : 'text-[#171A1F]'}`}>
                        {item.text}
                      </div>
                      <div className="text-[10px] text-[#69717D] mt-0.5 flex items-center gap-2">
                        <span className="font-semibold text-[#172C4D]">{item.roleHint}</span>
                        <span>·</span>
                        <span>Offset: {item.deadlineOffsetDays === 0 ? 'Immediate' : `+${item.deadlineOffsetDays} Days`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Legal Citations */}
          {activeTab === 'citations' && (
            <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#171A1F]">
                Cited Laws, Sections, &amp; Administrative Rules
              </h3>
              <div className="space-y-3">
                {notice.legalCitations.map((cit, idx) => (
                  <div key={idx} className="p-3.5 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#172C4D] text-xs">{cit.act}</span>
                      <span className="font-mono text-[11px] font-semibold text-[#B99A62] bg-white px-2 py-0.5 rounded border border-[#E7E5DF]">
                        {cit.section}
                      </span>
                    </div>

                    <p className="text-[#48505E] text-[11px] leading-relaxed">
                      <strong>Plain Meaning:</strong> {cit.plainMeaning}
                    </p>

                    {cit.extractedSnippet && (
                      <div className="p-2 bg-white rounded border border-[#E7E5DF] font-mono text-[10px] text-[#69717D]">
                        "{cit.extractedSnippet}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Required Documents Checklist */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#171A1F]">
                Required Evidentiary Enclosures
              </h3>
              <div className="space-y-2">
                {notice.requiredDocuments.map((doc) => (
                  <div key={doc.id} className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-[#171A1F] flex items-center gap-1.5">
                        <span>{doc.name}</span>
                        {doc.isMandatory && (
                          <span className="text-[10px] text-[#B91C1C] font-semibold">*Mandatory</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#69717D] mt-0.5">
                        {doc.description}
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm shrink-0 ${doc.isCollected ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#FFFBEB] text-[#B45309]'}`}>
                      {doc.isCollected ? 'Collected' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidentiary Notice Disclaimer */}
          <div className="p-3.5 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] text-[11px] text-[#69717D] leading-relaxed">
            <strong>Informational Guidance:</strong> The multilingual explanations, translations, and summaries generated above are designed to assist business owners and finance teams in triage and preparation. All original statutory sections, DINs, amounts, and dates remain legally authoritative.
          </div>
        </div>
      </div>
    </div>
  );
};
