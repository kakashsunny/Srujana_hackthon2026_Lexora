import React, { useState } from 'react';
import { 
  Briefcase, 
  HelpCircle, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  UserCheck, 
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Notice, ProfessionalAdvisor } from '../../types';
import { MOCK_PROFESSIONALS } from '../../data/mockNotices';

interface ProfessionalReviewProps {
  currentNotice: Notice;
  onSelectNoticeId: (id: string) => void;
  allNotices: Notice[];
}

export const ProfessionalReview: React.FC<ProfessionalReviewProps> = ({
  currentNotice,
  onSelectNoticeId,
  allNotices
}) => {
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const handleCopyConsultationBrief = () => {
    const brief = 
`LEGAL INTELLIGENCE CONSULTATION BRIEF
==================================================
MATTER: ${currentNotice.title}
REFERENCE: ${currentNotice.referenceNumber} ${currentNotice.din ? `| DIN: ${currentNotice.din}` : ''}
ISSUING AUTHORITY: ${currentNotice.issuingAuthority.name}
CLIENT: ${currentNotice.recipientName} (GSTIN/PAN: ${currentNotice.recipientGstinOrPan})
RESPONSE DEADLINE: ${currentNotice.responseDeadline}
AUTHENTICITY STATUS: ${currentNotice.authenticity.outcome.toUpperCase()}

RECOMMENDED SPECIALIST: ${currentNotice.recommendedProfessional}
RATIONALE: ${currentNotice.professionalReason}

KEY QUESTIONS TO ASK IN CONSULTATION:
${currentNotice.consultationQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

SUMMARY OF ALLEGATION / DISCREPANCY:
${currentNotice.whyReceived}

ENCLOSURES INVENTORY PREPARED:
${currentNotice.requiredDocuments.map(d => `- [${d.isCollected ? 'X' : ' '}] ${d.name}`).join('\n')}
==================================================
Generated via Lexora Platform`;

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="relative rounded-xl border border-[#E7E5DF] overflow-hidden bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Ambient Airy Office Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/src/assets/images/professional_office_airy_1792861035285.jpg"
            alt="Professional consultation office"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
            <span>Qualified Expert Advisory Protocol</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F] mt-1">
            Professional Review &amp; Consultation Handoff
          </h1>
          <p className="text-xs text-[#69717D] mt-0.5">
            Identify the exact qualification required, prepare a concise consultation brief, and engage verified practitioners.
          </p>
        </div>

        {/* Notice Switcher */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-xs text-[#69717D] font-medium">Matter:</span>
          <select
            value={currentNotice.id}
            onChange={(e) => onSelectNoticeId(e.target.value)}
            className="text-xs font-semibold bg-white border border-[#E7E5DF] rounded-md px-3 py-1.5 text-[#171A1F] focus:ring-1 focus:ring-[#172C4D]"
          >
            {allNotices.map((n) => (
              <option key={n.id} value={n.id}>
                {n.category.toUpperCase()} - {n.referenceNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Matter Recommendation Spotlight */}
      <div className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E5DF]">
          <div>
            <div className="text-xs text-[#69717D] uppercase font-semibold">Active Matter Assessment</div>
            <h2 className="text-lg font-bold text-[#171A1F] mt-0.5">{currentNotice.title}</h2>
            <div className="text-xs text-[#69717D] mt-1">
              Issued by: {currentNotice.issuingAuthority.name} · Statutory Deadline: <strong className="text-[#B91C1C] font-mono">{currentNotice.responseDeadline}</strong>
            </div>
          </div>

          <div className="p-3 bg-[#F7F6F2] border border-[#E7E5DF] rounded-lg text-xs space-y-1 sm:text-right">
            <div className="text-[10px] text-[#69717D] uppercase font-semibold">Recommended Discipline:</div>
            <div className="font-bold text-[#172C4D] text-sm">{currentNotice.recommendedProfessional}</div>
          </div>
        </div>

        {/* Reason and Consultation Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-2">
            <div className="font-bold text-[#171A1F] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#B99A62]" />
              <span>Why This Professional Is Needed</span>
            </div>
            <p className="text-[#48505E] text-xs leading-relaxed">
              {currentNotice.professionalReason}
            </p>
          </div>

          <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-2">
            <div className="font-bold text-[#171A1F] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#172C4D]" />
              <span>Recommended Questions to Pose to the Expert</span>
            </div>
            <ul className="space-y-1.5 text-[#48505E]">
              {currentNotice.consultationQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#B99A62] font-bold">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Generate & Copy Consultation Brief */}
        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-[#69717D]">
            Export a structured 1-page summary to save billable consultation hours.
          </div>

          <button
            onClick={handleCopyConsultationBrief}
            className="px-4 py-2 bg-[#172C4D] hover:bg-[#112038] text-[#F7F6F2] rounded-md text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            {copiedBrief ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBrief ? 'Brief Copied!' : 'Copy Consultation Brief'}</span>
          </button>
        </div>
      </div>

      {/* Directory of Verified Advisory Practitioners (Simulated) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#171A1F]">
            Practicing Specialists Directory
          </h2>
          <p className="text-xs text-[#69717D]">
            Simulated practitioner records filtered for Indian corporate, tax, and labour jurisdictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_PROFESSIONALS.map((pro) => (
            <div 
              key={pro.id}
              className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#172C4D] text-[#F7F6F2] flex items-center justify-center font-bold text-xs border border-[#B99A62]/30">
                    {pro.name.split(' ').slice(1, 3).map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-semibold text-[#172C4D] bg-[#F7F6F2] px-2 py-0.5 rounded-sm border border-[#E7E5DF]">
                    {pro.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#171A1F]">{pro.name}</h3>
                  <div className="text-[11px] text-[#69717D]">{pro.designation}</div>
                </div>

                <div className="text-xs text-[#48505E] space-y-1 border-t border-[#E7E5DF] pt-2">
                  <div><strong>Focus:</strong> {pro.specialization}</div>
                  <div><strong>Bar/ICAI ID:</strong> <span className="font-mono">{pro.barOrIcaId}</span></div>
                  <div><strong>Jurisdiction:</strong> {pro.city} ({pro.experienceYears} yrs exp)</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7E5DF]">
                <button
                  onClick={() => alert(`Simulated Booking: Consultation request for ${pro.name} dispatched with active notice metadata.`)}
                  className="w-full py-1.5 bg-[#F7F6F2] hover:bg-[#172C4D] text-[#172C4D] hover:text-white border border-[#E7E5DF] text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
