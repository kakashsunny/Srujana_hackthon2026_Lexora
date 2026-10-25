import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  ArrowRight, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Search, 
  Filter, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Notice, AuthorityType } from '../../types';

interface OverviewDashboardProps {
  notices: Notice[];
  onSelectNotice: (id: string, initialTab?: 'analysis' | 'authenticity' | 'response') => void;
  onOpenAnalyzeModal: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  notices,
  onSelectNotice,
  onOpenAnalyzeModal
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'deadline' | 'priority' | 'received'>('deadline');

  // Metrics
  const openCount = notices.length;
  const approachingCount = notices.filter(n => {
    const deadlineDate = new Date(n.responseDeadline);
    const diffDays = Math.ceil((deadlineDate.getTime() - new Date('2026-10-24').getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 12 && diffDays >= 0;
  }).length;
  const actionRequiredCount = notices.filter(n => n.status === 'received' || n.status === 'analyzed').length;
  const resolvedCount = 6; // Historical verified resolved matters

  // Priority attention items (urgency / fraud alert)
  const attentionItems = notices.filter(
    n => n.priority === 'urgent' || n.authenticity.outcome === 'suspicious'
  );

  // Table filtering
  const filteredNotices = notices.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
      n.referenceNumber.toLowerCase().includes(tableSearch.toLowerCase()) ||
      n.issuingAuthority.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      (n.din && n.din.toLowerCase().includes(tableSearch.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterCategory === 'all') return true;
    if (filterCategory === 'gst') return n.category === 'gst';
    if (filterCategory === 'tax') return n.category === 'income_tax' || n.category === 'gst';
    if (filterCategory === 'labour') return n.category === 'labour';
    if (filterCategory === 'legal') return n.category === 'legal_court';
    if (filterCategory === 'suspicious') return n.authenticity.outcome === 'suspicious';
    if (filterCategory === 'urgent') return n.priority === 'urgent';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome & Ambient Editorial Hero */}
      <div className="relative rounded-xl border border-[#E7E5DF] overflow-hidden bg-white shadow-xs">
        {/* Subtle Ambient Background Photo with measured scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/src/assets/images/hero_indian_legaltech_desk_1792861033728.jpg"
            alt="Indian legal-tech workspace background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 z-0 pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
              <span>Executive Command Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
              Your notices. Under control.
            </h1>
            <p className="text-sm text-[#48505E] leading-relaxed">
              Understand what matters, verify what you can, and never lose track of a statutory deadline.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAnalyzeModal}
                className="px-4 py-2 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Analyze a Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('notices-table-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#F7F6F2] text-[#171A1F] hover:bg-[#EBE8E0] border border-[#E7E5DF] text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                View all notices ({notices.length})
              </button>
            </div>
          </div>

          {/* Quick Drag & Drop Box */}
          <div 
            onClick={onOpenAnalyzeModal}
            className="w-full lg:w-80 p-4 border border-dashed border-[#B99A62]/60 hover:border-[#172C4D] bg-[#F7F6F2] hover:bg-[#EBE8E0] rounded-lg transition-all text-center cursor-pointer group shrink-0"
          >
            <UploadCloud className="w-7 h-7 mx-auto text-[#B99A62] group-hover:scale-110 group-hover:text-[#172C4D] transition-all mb-2" />
            <div className="text-xs font-semibold text-[#171A1F]">
              Drop any notice here
            </div>
            <p className="text-[11px] text-[#69717D] mt-0.5">
              PDF, scanned notices, or photos · Instant DIN &amp; Red-Flag check
            </p>
            <div className="mt-2 text-[10px] text-[#172C4D] font-mono font-medium">
              or select preset samples
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Open Notices */}
        <div className="bg-white p-5 rounded-lg border border-[#E7E5DF] shadow-xs">
          <div className="text-xs text-[#69717D] font-medium flex items-center justify-between">
            <span>Open Notices</span>
            <span className="text-[11px] text-[#172C4D]">Active</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#171A1F] mt-2 tabular-nums">
            {openCount}
          </div>
          <div className="text-[11px] text-[#69717D] mt-1 flex items-center gap-1">
            <span>GST, Income Tax &amp; Labour</span>
          </div>
        </div>

        {/* Metric 2: Deadlines Approaching */}
        <div className="bg-white p-5 rounded-lg border border-[#E7E5DF] shadow-xs">
          <div className="text-xs text-[#69717D] font-medium flex items-center justify-between">
            <span>Deadlines Approaching</span>
            <span className="text-[11px] text-[#B91C1C] font-semibold">&le; 12 Days</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#B91C1C] mt-2 tabular-nums">
            {approachingCount}
          </div>
          <div className="text-[11px] text-[#69717D] mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#B91C1C]" />
            <span>Requires response preparation</span>
          </div>
        </div>

        {/* Metric 3: Awaiting Your Action */}
        <div className="bg-white p-5 rounded-lg border border-[#E7E5DF] shadow-xs">
          <div className="text-xs text-[#69717D] font-medium flex items-center justify-between">
            <span>Awaiting Your Action</span>
            <span className="text-[11px] text-[#B45309]">Pending</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#171A1F] mt-2 tabular-nums">
            {actionRequiredCount}
          </div>
          <div className="text-[11px] text-[#69717D] mt-1">
            <span>Document collection &amp; CA sign-off</span>
          </div>
        </div>

        {/* Metric 4: Resolved */}
        <div className="bg-white p-5 rounded-lg border border-[#E7E5DF] shadow-xs">
          <div className="text-xs text-[#69717D] font-medium flex items-center justify-between">
            <span>Resolved This Month</span>
            <span className="text-[11px] text-[#15803D]">Closed</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#15803D] mt-2 tabular-nums">
            {resolvedCount}
          </div>
          <div className="text-[11px] text-[#69717D] mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
            <span>No penalties assessed</span>
          </div>
        </div>
      </div>

      {/* 3. Priority Action Panel ("Needs your attention") */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#171A1F] flex items-center gap-2">
              <span>Needs Your Attention</span>
              <span className="text-xs font-normal text-[#69717D]">
                (Sorted by response urgency &amp; authenticity risk)
              </span>
            </h2>
          </div>
          <div className="text-[11px] text-[#69717D] hidden sm:block">
            Authenticity risk and legal severity are evaluated independently
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {attentionItems.map((notice) => {
            const isSuspicious = notice.authenticity.outcome === 'suspicious';
            const deadlineDate = new Date(notice.responseDeadline);
            const daysLeft = Math.ceil((deadlineDate.getTime() - new Date('2026-10-24').getTime()) / (1000 * 60 * 60 * 24));

            return (
              <div 
                key={notice.id}
                className="bg-white rounded-lg border border-[#E7E5DF] p-5 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {/* Status & Category typography */}
                    <div className="flex items-center gap-2 text-[11px] text-[#69717D]">
                      <span className="font-semibold uppercase text-[#172C4D]">{notice.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#48505E]">{notice.referenceNumber}</span>
                    </div>

                    {/* Authenticity Pill vs Urgency */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSuspicious ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded-sm">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Suspicious Indicators</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded-sm">
                          <ShieldCheck className="w-3 h-3" />
                          <span>No Major Red Flags</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[#171A1F] leading-snug line-clamp-2">
                    {notice.title}
                  </h3>
                  <div className="text-xs text-[#69717D] mt-1">
                    Issued by: {notice.issuingAuthority.name}
                  </div>

                  {/* Clarification Box */}
                  <div className={`mt-3 p-3 rounded-md text-xs ${isSuspicious ? 'bg-[#FEF2F2] text-[#7F1D1D] border border-[#FECACA]' : 'bg-[#F7F6F2] text-[#48505E] border border-[#E7E5DF]'}`}>
                    <div className="font-semibold text-[11px] mb-0.5">
                      {isSuspicious ? '⚠ Critical Forensic Warning:' : 'Required Immediate Action:'}
                    </div>
                    <div className="text-[11px] leading-relaxed">
                      {isSuspicious 
                        ? 'Private UPI payment address and invalid DIN checksum detected. Do NOT pay via document links. Verify on official CBIC portal.'
                        : notice.actionItems[0]?.text || 'Prepare factual reconciliation and engage tax CA.'}
                    </div>
                  </div>
                </div>

                {/* Footer with Days Remaining and Clear CTA */}
                <div className="mt-4 pt-3 border-t border-[#E7E5DF] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#69717D]">
                    <Clock className="w-3.5 h-3.5 text-[#172C4D]" />
                    <span>Response Deadline:</span>
                    <span className="font-mono font-bold text-[#171A1F] tabular-nums">
                      {notice.responseDeadline} ({daysLeft > 0 ? `${daysLeft} days` : 'Today'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSuspicious ? (
                      <button
                        onClick={() => onSelectNotice(notice.id, 'authenticity')}
                        className="px-3 py-1.5 bg-[#B91C1C] hover:bg-[#991B1B] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        Examine in Lab
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectNotice(notice.id, 'analysis')}
                        className="px-3 py-1.5 bg-[#172C4D] hover:bg-[#112038] text-white font-medium text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        Open Workspace
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Notice Overview Table */}
      <div id="notices-table-section" className="bg-white rounded-lg border border-[#E7E5DF] shadow-xs overflow-hidden">
        {/* Table Header Bar & Filter Tabs */}
        <div className="p-4 sm:p-5 border-b border-[#E7E5DF] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#171A1F]">Notice Overview &amp; Register</h2>
              <p className="text-xs text-[#69717D]">
                Comprehensive list of active, pending, and investigated notices for Apex Precision Tools.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#69717D] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter by reference, authority..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F7F6F2] border border-[#E7E5DF] rounded-md text-[#171A1F] focus:outline-none focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All Notices' },
              { id: 'gst', label: 'GST & CBIC' },
              { id: 'tax', label: 'Tax & Income Tax' },
              { id: 'labour', label: 'Labour & EPFO' },
              { id: 'legal', label: 'Legal & Court' },
              { id: 'suspicious', label: 'Authenticity Concerns' },
              { id: 'urgent', label: 'Urgent Deadlines' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`
                  px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer
                  ${filterCategory === tab.id
                    ? 'bg-[#172C4D] text-[#F7F6F2]'
                    : 'bg-[#F7F6F2] text-[#48505E] hover:text-[#171A1F] hover:bg-[#EBE8E0]'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F2] text-[#69717D] font-medium border-b border-[#E7E5DF]">
              <tr>
                <th className="py-3 px-4 font-semibold">Notice / Reference</th>
                <th className="py-3 px-4 font-semibold">Issuing Authority</th>
                <th className="py-3 px-3 font-semibold">Received Date</th>
                <th className="py-3 px-3 font-semibold">Response Deadline</th>
                <th className="py-3 px-3 font-semibold">Authenticity Assessment</th>
                <th className="py-3 px-3 font-semibold">Priority</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DF]">
              {filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#69717D]">
                    No notices matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((n) => {
                  const isSuspicious = n.authenticity.outcome === 'suspicious';
                  const isUnableToVerify = n.authenticity.outcome === 'unable_to_verify';

                  return (
                    <tr key={n.id} className="hover:bg-[#F7F6F2] transition-colors">
                      {/* 1. Notice / Reference */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#171A1F]">{n.title}</div>
                        <div className="text-[11px] text-[#69717D] font-mono mt-0.5 flex items-center gap-1.5">
                          <span>Ref: {n.referenceNumber}</span>
                          {n.din && (
                            <>
                              <span>·</span>
                              <span>DIN: {n.din.substring(0, 16)}...</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* 2. Authority */}
                      <td className="py-3 px-4 text-[#48505E]">
                        <div className="font-medium text-[#171A1F]">{n.issuingAuthority.name}</div>
                        <div className="text-[11px] text-[#69717D]">{n.issuingAuthority.department}</div>
                      </td>

                      {/* 3. Received Date */}
                      <td className="py-3 px-3 font-mono text-[#69717D] tabular-nums whitespace-nowrap">
                        {n.dateReceived}
                      </td>

                      {/* 4. Response Deadline */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="font-mono font-semibold text-[#171A1F] tabular-nums">
                          {n.responseDeadline}
                        </div>
                        <div className="text-[10px] text-[#69717D]">
                          {n.isDeadlineInferred ? 'Inferred statutory' : 'Explicit notice'}
                        </div>
                      </td>

                      {/* 5. Authenticity Assessment */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {isSuspicious ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B91C1C]">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Suspicious</span>
                          </span>
                        ) : isUnableToVerify ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B45309]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Requires Direct Verification</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#15803D]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Appears Genuine</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Priority */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`text-[11px] font-semibold uppercase ${
                          n.priority === 'urgent' ? 'text-[#B91C1C]' :
                          n.priority === 'high' ? 'text-[#B45309]' : 'text-[#48505E]'
                        }`}>
                          {n.priority}
                        </span>
                      </td>

                      {/* 7. Status */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[11px] text-[#48505E] capitalize bg-[#F7F6F2] px-2 py-0.5 rounded-sm border border-[#E7E5DF]">
                          {n.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* 8. Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => onSelectNotice(n.id, isSuspicious ? 'authenticity' : 'analysis')}
                          className="px-2.5 py-1 text-xs font-semibold text-[#172C4D] hover:text-white hover:bg-[#172C4D] rounded-md transition-colors border border-[#172C4D]/30 cursor-pointer"
                        >
                          {isSuspicious ? 'Inspect' : 'Review'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
