import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Edit3, 
  Briefcase, 
  FolderArchive, 
  Check, 
  ChevronRight,
  Languages,
  AlertTriangle,
  Scale
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5DF] rounded-md shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
          <span className="text-[11px] font-bold text-[#172C4D] tracking-wider uppercase">
            Feature Architecture
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171A1F] tracking-tight">
          Tools built for serious legal notice triage
        </h1>
        <p className="text-sm sm:text-base text-[#48505E] leading-relaxed">
          Explore the complete suite of capabilities powering Lexora — engineered specifically to give Indian businesses clarity, evidentiary discipline, and procedural safety.
        </p>
      </div>

      {/* Feature 1: Plain-Language Legal Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#172C4D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#172C4D]" />
            <span>01 / Document Comprehension</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
            Plain-English translations &amp; dual Kannada localization
          </h2>
          <p className="text-xs sm:text-sm text-[#48505E] leading-relaxed">
            Legal notices often deliberately obscure straightforward issues in circular clauses. We parse the document to reveal the underlying transactional dispute: whether an input credit was disputed, a supplier failed to file GSTR-1, or turnover differed between audited books and Form 26AS.
          </p>
          <ul className="space-y-2 text-xs text-[#171A1F]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Plain English summary + regional Kannada localization toggle</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Explicit statutory sections extracted with plain-language definitions</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Clear explanation of why your specific company was targeted</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
            <span className="font-bold text-[#171A1F]">Notice at a Glance (Live Preview)</span>
            <span className="text-[10px] font-mono text-[#69717D]">Ref: ITBA/AST/S/143(2)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-[#F7F6F2] rounded border border-[#E7E5DF]">
              <div className="text-[10px] text-[#69717D]">Issuing Office</div>
              <div className="font-bold text-[#171A1F] truncate">NeAC, Income Tax Dept</div>
            </div>
            <div className="p-2.5 bg-[#F7F6F2] rounded border border-[#E7E5DF]">
              <div className="text-[10px] text-[#69717D]">Response Window</div>
              <div className="font-bold font-mono text-[#B91C1C]">30 Statutory Days</div>
            </div>
          </div>

          <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0] text-xs text-[#14532D]">
            <div className="font-bold text-[11px] mb-1">Executive Summary:</div>
            <p className="text-[11px] leading-relaxed">
              Complete faceless scrutiny initiated regarding gross receipts variance of ₹65 Lakh between Tax Audit Report and Annual Information Statement (AIS). Submissions must be uploaded via e-Proceedings.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2: Response Workspace & Guided Rebuttal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
            <span className="font-bold text-[#171A1F]">7-Step Response Builder</span>
            <span className="text-[10px] font-mono text-[#15803D]">Formal Draft Ready</span>
          </div>

          <div className="p-3.5 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-2 font-mono text-[11px] text-[#171A1F]">
            <div className="text-[#69717D] text-[10px] font-sans uppercase font-bold">Generated Legal Draft Heading:</div>
            <div className="font-bold">BEFORE THE SUPERINTENDENT OF CENTRAL GST, DIVISION-IV</div>
            <div className="text-[#69717D]">IN RE: M/S APEX PRECISION TOOLS PVT LTD (GSTIN: 07AAACA...)</div>
            <p className="text-[10px] font-sans text-[#48505E] pt-1 leading-relaxed">
              "1. The Respondent respectfully submits that the proposed demand of INR 3,42,500 is factually erroneous and based on timing differences in supplier GSTR-1 filings..."
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#69717D]">
            <span>✓ Pre-formatted Annexures List</span>
            <span>✓ One-click clipboard copy &amp; print</span>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#172C4D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#172C4D]" />
            <span>02 / Response Preparation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
            Guided response workspace &amp; formal brief generator
          </h2>
          <p className="text-xs sm:text-sm text-[#48505E] leading-relaxed">
            Never write legal responses from scratch or accidentally admit unverified liability. Our guided 7-step builder prompts you for relevant facts, helps assemble necessary enclosures, and drafts a structured formal submission ready for CA verification and e-portal filing.
          </p>
          <ul className="space-y-2 text-xs text-[#171A1F]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Step-by-step checklist of mandatory enclosures (Challans, Invoices)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Formal prayer for relief including requests for personal hearing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Zero fabricated admissions—unknown fields remain clear placeholders</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Feature 3: Professional Consultation Handoff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#172C4D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#172C4D]" />
            <span>03 / Professional Handoff</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
            Know when to consult a CA, Advocate, or CS
          </h2>
          <p className="text-xs sm:text-sm text-[#48505E] leading-relaxed">
            Not all notices require expensive court counsel, while others carry severe personal liability for company directors under Section 141 of the NI Act. We identify the exact qualification required and generate a 1-page consultation brief to save billable professional hours.
          </p>
          <ul className="space-y-2 text-xs text-[#171A1F]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Specialist matching: Tax CA vs High Court Advocate vs Labour Consultant</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>Targeted list of strategic questions to pose to your advisor</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>One-click export of an executive consultation package</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
            <span className="font-bold text-[#171A1F]">Generated Consultation Brief</span>
            <span className="text-[10px] font-mono text-[#B99A62]">1-Page Export</span>
          </div>

          <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] text-xs space-y-2">
            <div className="font-bold text-[#172C4D]">Recommended Specialist: Chartered Accountant (Tax)</div>
            <div className="text-[11px] text-[#48505E]">
              <strong>Primary Question:</strong> "Does Form DRC-01 reflect on our authenticated GST portal dashboard under Additional Notices?"
            </div>
            <div className="text-[11px] text-[#48505E]">
              <strong>Secondary Question:</strong> "If the DIN is unverified on cbic.gov.in/din, should we submit an administrative complaint to the GST Fraud Cell?"
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/app"
              className="text-xs font-semibold text-[#172C4D] hover:underline"
            >
              Test consultation brief builder in App →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 bg-[#172C4D] text-[#F7F6F2] rounded-2xl shadow-md text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold">Put every notice on your desk under control</h3>
        <p className="text-xs sm:text-sm text-[#D7D4CC] max-w-xl mx-auto">
          Experience the complete legal intelligence workspace with preloaded Indian statutory notice cases.
        </p>
        <div className="pt-2">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Launch Lexora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
