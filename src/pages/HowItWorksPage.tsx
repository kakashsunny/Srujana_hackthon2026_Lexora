import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Upload, 
  Search, 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Briefcase,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Receive & Ingest Notice',
      subtitle: 'Effortless forwarding or drag-and-drop',
      description: 'Founders and finance teams receive notices via registered post, speed post, or portal emails. Forward any incoming communication directly to your company vault address or drag-and-drop a scan/PDF.',
      details: [
        'Dedicated secure company forwarding address (e.g. notices@vault.lexora.in)',
        'Client-side optical character recognition (OCR) and layout decomposition',
        'Confidential hashing and zero retention of unnecessary personal data'
      ],
      icon: Mail
    },
    {
      num: '02',
      title: 'Understand & Investigate',
      subtitle: 'Plain language and forensic checksums',
      description: 'The platform immediately translates administrative legalese into simple English (with dual Kannada preview). Concurrently, the forensic engine inspects sender email routing, validates the 20-digit DIN checksum, and scans for extortion payment channels.',
      details: [
        'Plain-English translation of alleged tax shortfalls and underlying reasons',
        'Algorithmic validation against official CBIC/CBDT Document Identification Numbers',
        'Flagging of private UPI IDs (@okaxis) and fraudulent settlement QR codes'
      ],
      icon: Search
    },
    {
      num: '03',
      title: 'Prepare Your Response',
      subtitle: 'Structured reply brief & enclosures checklist',
      description: 'A guided 7-step response builder compiles required evidentiary exhibits (GSTR-2B reconciliations, challans, contractor wage rolls) and generates a formal written submission with statutory sections and prayer for relief.',
      details: [
        'Pre-populated legal headings and recipient commissionerate formatting',
        'Point-by-point factual dispute builder with editable placeholders',
        'Automated Consultation Brief export for your retained CA or Advocate'
      ],
      icon: FileText
    },
    {
      num: '04',
      title: 'Track Statutory Deadlines',
      subtitle: 'General Clauses Act & court closure awareness',
      description: 'Statutory timelines are tracked on an interactive calendar that calculates business days and automatically accounts for Sunday or gazetted court closures under Section 10 of the General Clauses Act.',
      details: [
        'Distinct identification between explicit notice deadlines and inferred rules',
        'Milestone tracking: Received → Analyzed → Evidence Gathered → Filed',
        'Automated notification alerts dispatched to registered directors'
      ],
      icon: Clock
    }
  ];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5DF] rounded-md shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
          <span className="text-[11px] font-bold text-[#172C4D] tracking-wider uppercase">
            Transparent Four-Step Lifecycle
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171A1F] tracking-tight">
          How Lexora works
        </h1>
        <p className="text-sm sm:text-base text-[#48505E] leading-relaxed">
          From the instant a physical envelope arrives on your desk to the minute an official acknowledgement number is filed, we replace administrative panic with structured, evidence-backed control.
        </p>
      </div>

      {/* 4-Step Horizontal Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((st, i) => {
          const Icon = st.icon;
          return (
            <div 
              key={st.num}
              className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#B99A62] bg-[#F7F6F2] px-2 py-0.5 rounded border border-[#E7E5DF]">
                    STEP {st.num}
                  </span>
                  <div className="w-8 h-8 rounded-md bg-[#172C4D] text-[#F7F6F2] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#B99A62]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#171A1F] leading-snug">
                    {st.title}
                  </h3>
                  <div className="text-[11px] text-[#B99A62] font-semibold mt-0.5">
                    {st.subtitle}
                  </div>
                </div>

                <p className="text-xs text-[#69717D] leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E5DF]/60 space-y-1.5 text-[11px] text-[#171A1F]">
                {st.details.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#15803D] font-bold">✓</span>
                    <span className="text-[#48505E]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Deep-Dive Section */}
      <div className="bg-white rounded-2xl border border-[#E7E5DF] p-8 sm:p-12 shadow-sm space-y-12">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
            Methodology &amp; Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
            Every notice understood. Every deadline under control.
          </h2>
          <p className="text-xs sm:text-sm text-[#48505E] leading-relaxed">
            Unlike generic AI chat tools that fabricate legal case law or give inaccurate filing dates, Lexora uses deterministic rule engines grounded in actual Indian statutory procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-2">
            <div className="font-bold text-[#172C4D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
              <span>Statutory Rule Invariants</span>
            </div>
            <p className="text-[#69717D] leading-relaxed">
              We separate factual allegations from statutory citations (CGST Sec 73/74, IT Act Sec 143(2), NI Act Sec 138), highlighting exact sections that apply to your business.
            </p>
          </div>

          <div className="p-5 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-2">
            <div className="font-bold text-[#172C4D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B99A62]" />
              <span>General Clauses Act (Sec 10)</span>
            </div>
            <p className="text-[#69717D] leading-relaxed">
              If your deadline falls on a gazetted holiday or weekend, the platform automatically factors in procedural extensions to ensure your appeal rights remain intact.
            </p>
          </div>

          <div className="p-5 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-2">
            <div className="font-bold text-[#172C4D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#172C4D]" />
              <span>Confidential &amp; Secure</span>
            </div>
            <p className="text-[#69717D] leading-relaxed">
              Data is processed with strict client-side encryption. We never share your company financials or return filings with external advertising or public models.
            </p>
          </div>
        </div>

        {/* Launch Workspace CTA */}
        <div className="p-6 bg-[#172C4D] text-[#F7F6F2] rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold">Ready to see the workflow in action?</div>
            <p className="text-xs text-[#D7D4CC]">Test with sample GST, Income Tax, Labour, and Cheque notices in the interactive workspace.</p>
          </div>

          <Link
            to="/app"
            className="px-5 py-3 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Launch App Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
