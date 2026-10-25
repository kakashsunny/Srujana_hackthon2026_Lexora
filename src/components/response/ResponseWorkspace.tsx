import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Printer, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  Download,
  Info,
  Edit2
} from 'lucide-react';
import { Notice, ResponseDraft } from '../../types';

interface ResponseWorkspaceProps {
  notice: Notice;
  onNavigateToProfessional: () => void;
}

export const ResponseWorkspace: React.FC<ResponseWorkspaceProps> = ({
  notice,
  onNavigateToProfessional
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(5); // Default to review/draft view
  const [draftStatus, setDraftStatus] = useState<'draft' | 'reviewed_by_ca' | 'ready_for_portal'>('draft');

  // Interactive editable fields
  const [recipientOffice, setRecipientOffice] = useState<string>(
    notice.issuingAuthority.name
  );
  const [subjectLine, setSubjectLine] = useState<string>(
    `FORMAL REPLY / PRELIMINARY SUBMISSION IN RESPECT OF NOTICE REF NO. ${notice.referenceNumber}`
  );
  const [factualStatement, setFactualStatement] = useState<string>(
    `1. The Respondent (M/s Apex Precision Tools Private Limited) is a bona fide registered entity engaged in precision manufacturing and has consistently adhered to all statutory filing requirements.\n` +
    `2. In respect of the allegations set out in the impugned notice dated ${notice.dateIssued}, the Respondent submits that the alleged shortfall of tax / discrepancy is factually incorrect and arises solely out of timing differences in vendor return filings.\n` +
    `3. All relevant input purchases were supported by tax invoices, electronic way bills, and payments settled through banking channels within statutory limits.`
  );
  const [prayerRelief, setPrayerRelief] = useState<string>(
    `In light of the facts and documentary evidence enclosed herewith, it is respectfully prayed that:\n` +
    `a) The preliminary objections raised herein be taken on record;\n` +
    `b) The impugned demand / proposed adverse action be dropped in its entirety;\n` +
    `c) If any further clarification is required, an opportunity of personal hearing with at least 15 days prior notice be granted in compliance with principles of natural justice.`
  );

  const [enclosures, setEnclosures] = useState<string[]>([
    'Annexure-A: Copy of Imugned Notice and Proof of Receipt',
    'Annexure-B: GSTR-2B vs GSTR-3B Reconciliation Statement FY 2024-25',
    'Annexure-C: CA Certificate on Statutory Book Discrepancies',
    'Annexure-D: Bank Account Statements Evidencing Consideration'
  ]);

  const handleCopyDraft = () => {
    const fullText = 
`BEFORE THE ${recipientOffice.toUpperCase()}
IN THE MATTER OF:
M/s Apex Precision Tools Private Limited (GSTIN/PAN: ${notice.recipientGstinOrPan})
... Respondent

VERSUS

${notice.issuingAuthority.name}
... Issuing Authority

SUBJECT: ${subjectLine}
REFERENCE: ${notice.referenceNumber} ${notice.din ? `| DIN: ${notice.din}` : ''}

RESPECTFULLY SHEWETH:

I. PRELIMINARY FACTUAL SUBMISSIONS:
${factualStatement}

II. PRAYER / RELIEF SOUGHT:
${prayerRelief}

III. LIST OF ENCLOSURES:
${enclosures.map((e, idx) => `${idx + 1}. ${e}`).join('\n')}

For M/s Apex Precision Tools Private Limited

[Authorized Signatory / Director]
Date: 24th October 2026
Place: New Delhi`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { num: 1, title: 'Notice Summary' },
    { num: 2, title: 'Gather Documents' },
    { num: 3, title: 'Factual Statement' },
    { num: 4, title: 'Rebuttal Points' },
    { num: 5, title: 'Formal Draft' },
    { num: 6, title: 'Professional Review' },
    { num: 7, title: 'Portal Filing' }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
            <span>Guided Statutory Reply Builder</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F] mt-1">
            Response Workspace
          </h1>
          <p className="text-xs text-[#69717D] mt-0.5">
            Prepare structured, evidence-backed replies with point-by-point rebuttals and statutory enclosures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F7F6F2] border border-[#E7E5DF] text-xs font-semibold text-[#171A1F] rounded-md transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#69717D]" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Full Draft'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Formal Brief</span>
          </button>
        </div>
      </div>

      {/* 7-Step Progress Navigator */}
      <div className="bg-white rounded-xl border border-[#E7E5DF] p-4 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-2">
          {steps.map((st) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(st.num)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeStep === st.num
                  ? 'bg-[#172C4D] text-[#F7F6F2]'
                  : activeStep > st.num
                  ? 'bg-[#F0FDF4] text-[#15803D]'
                  : 'text-[#69717D] hover:bg-[#F7F6F2]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                activeStep === st.num ? 'bg-[#B99A62] text-white' : 'bg-black/10'
              }`}>
                {st.num}
              </span>
              <span className="truncate">{st.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Draft Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <h2 className="text-sm font-bold text-[#171A1F] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#172C4D]" />
                <span>Formal Written Submission Draft</span>
              </h2>
              <span className="text-[11px] text-[#69717D] font-mono">
                Status: {draftStatus.toUpperCase()}
              </span>
            </div>

            {/* Recipient Box */}
            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-semibold text-[#69717D] uppercase">
                Addressed To:
              </label>
              <input
                type="text"
                value={recipientOffice}
                onChange={(e) => setRecipientOffice(e.target.value)}
                className="w-full p-2 bg-[#F7F6F2] border border-[#E7E5DF] rounded-md font-medium text-[#171A1F] text-xs focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>

            {/* Subject Line */}
            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-semibold text-[#69717D] uppercase">
                Subject Line:
              </label>
              <input
                type="text"
                value={subjectLine}
                onChange={(e) => setSubjectLine(e.target.value)}
                className="w-full p-2 bg-[#F7F6F2] border border-[#E7E5DF] rounded-md font-medium text-[#171A1F] text-xs focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>

            {/* Statement of Facts (Editable) */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-[#69717D] uppercase">
                  Statement of Factual Circumstances:
                </label>
                <span className="text-[10px] text-[#69717D]">Editable in place</span>
              </div>
              <textarea
                rows={5}
                value={factualStatement}
                onChange={(e) => setFactualStatement(e.target.value)}
                className="w-full p-3 bg-[#F7F6F2] border border-[#E7E5DF] rounded-md text-[#171A1F] text-xs font-mono leading-relaxed focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>

            {/* Prayer / Relief */}
            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-semibold text-[#69717D] uppercase">
                Prayer / Requested Relief:
              </label>
              <textarea
                rows={4}
                value={prayerRelief}
                onChange={(e) => setPrayerRelief(e.target.value)}
                className="w-full p-3 bg-[#F7F6F2] border border-[#E7E5DF] rounded-md text-[#171A1F] text-xs font-mono leading-relaxed focus:ring-1 focus:ring-[#172C4D]"
              />
            </div>

            {/* Enclosures Checklist */}
            <div className="space-y-2 text-xs pt-2 border-t border-[#E7E5DF]">
              <div className="font-bold text-[#171A1F]">
                List of Attached Enclosures (Annexures)
              </div>
              <div className="space-y-1.5">
                {enclosures.map((enc, idx) => (
                  <div key={idx} className="p-2 bg-[#F7F6F2] rounded border border-[#E7E5DF] font-mono text-[11px] text-[#48505E] flex items-center justify-between">
                    <span>{enc}</span>
                    <span className="text-[10px] text-[#15803D] font-bold">Attached</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Protocol & CA Review (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Professional Review Handoff */}
          <div className="bg-white rounded-xl border border-[#E7E5DF] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#172C4D]">
              <Briefcase className="w-4 h-4 text-[#B99A62]" />
              <span>Expert Sign-Off Required</span>
            </div>
            <p className="text-xs text-[#48505E] leading-relaxed">
              Statutory replies to {notice.issuingAuthority.name} carry legal binding consequences. We recommend having your designated {notice.recommendedProfessional} review this draft before digital portal upload.
            </p>

            <button
              onClick={onNavigateToProfessional}
              className="w-full py-2 bg-[#172C4D] hover:bg-[#112038] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Dispatch Brief to Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Verification Protocol Warning */}
          <div className="bg-[#FFFBEB] rounded-xl border border-[#FDE68A] p-5 text-xs text-[#92400E] space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#B45309]" />
              <span>Important Submission Rules</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside leading-relaxed text-[#78350F]">
              <li>Never admit unverified liabilities without cross-checking bank records.</li>
              <li>Ensure all exhibits are numbered consecutively (Annexure A, B, C...).</li>
              <li>Upload only through the official authenticated e-filing portal.</li>
              <li>Retain the generated Ack / Acknowledgement Number with timestamp.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
