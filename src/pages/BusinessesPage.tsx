import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  TrendingUp, 
  Briefcase, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const BusinessesPage: React.FC = () => {
  const personas = [
    {
      title: 'Small Businesses & Retailers',
      badge: 'MSME & Trade',
      icon: Building2,
      context: 'Receiving unexpected GST or Municipal notices',
      challenge: 'Shop owners and traders frequently receive notices citing Section 73 alleging supplier tax non-payment. Without an in-house legal team, panic or scam payment is a real risk.',
      solution: 'Lexora instantly parses the document into plain English, confirms if the notice is genuine via DIN checks, and tells you whether your accountant or CA needs to handle it.',
      useCases: [
        'Form GST DRC-01 Input Tax Credit mismatch inquiries',
        'Municipal license inspections and property tax reassessments',
        'State commercial tax department clarification requests'
      ]
    },
    {
      title: 'Startup Founders & Executive Teams',
      badge: 'High-Growth Tech',
      icon: TrendingUp,
      context: 'Protecting company valuation & director liabilities',
      challenge: 'Early-stage founders face sudden tax scrutiny, angel tax inquiries, or vendor cheque notices that carry personal criminal liability under Section 141 of the Negotiable Instruments Act.',
      solution: 'Automated executive summaries highlight immediate director liability risks, strict 15-day statutory response windows, and strategic questions for legal counsel.',
      useCases: [
        'Section 138 Negotiable Instruments Act statutory 15-day demand notices',
        'Income Tax Section 143(2) scrutiny and Section 144B faceless assessment',
        'Ministry of Corporate Affairs (MCA) compliance and director KYC inquiries'
      ]
    },
    {
      title: 'Accountants & Retained CAs',
      badge: 'Finance & Audit',
      icon: Briefcase,
      context: 'Preparing factual reconciliations & replies',
      challenge: 'Finance teams waste dozens of billable hours deciphering vague show-cause notices and matching disputed invoices against multiple portal ledgers.',
      solution: 'Prepares structured 3-way reconciliations (GSTR-2B vs 3B vs Audited Books) and drafts formal legal reply outlines ready for filing under e-Proceedings.',
      useCases: [
        'Annual return turnover reconciliation variance (P&L vs AIS vs 26AS)',
        'Drafting formal point-by-point rebuttals with statutory annexures',
        'Client notice triage across multiple registered company branches'
      ]
    },
    {
      title: 'Operations & HR Compliance Teams',
      badge: 'Workforce & Labour',
      icon: UserCheck,
      context: 'Labour department audits & contractor liabilities',
      challenge: 'Labour inspections from EPFO or ESIC frequently summon managing directors for alleged contractor wage roll non-remittances under Section 7A & 8A.',
      solution: 'Identifies contractor indemnity obligations, organizes wage muster roll evidence, and prepares authorization briefs for quasi-judicial commissioner hearings.',
      useCases: [
        'EPFO Section 7A quasi-judicial inquiry summons and assessments',
        'Contractor TRRN challan verification and principal employer defense',
        'ESIC wage threshold inspection compliance audits'
      ]
    }
  ];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5DF] rounded-md shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
          <span className="text-[11px] font-bold text-[#172C4D] tracking-wider uppercase">
            Operational Workflows
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171A1F] tracking-tight">
          Built for businesses that cannot afford to miss a notice
        </h1>
        <p className="text-sm sm:text-base text-[#48505E] leading-relaxed">
          From neighborhood retail enterprises to venture-backed startups and multi-branch manufacturers, Lexora provides the exact right depth of intelligence for every role.
        </p>
      </div>

      {/* 4 Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {personas.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-[#E7E5DF] p-8 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase bg-[#F7F6F2] text-[#172C4D] px-2.5 py-1 rounded border border-[#E7E5DF]">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#171A1F]">
                    {p.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#B99A62] mt-0.5">
                    {p.context}
                  </div>
                </div>

                <div className="text-xs text-[#48505E] space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-[#171A1F]">The Challenge: </strong>
                    {p.challenge}
                  </p>
                  <p className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF]">
                    <strong className="text-[#172C4D]">How Lexora Solves It: </strong>
                    {p.solution}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5DF] space-y-2">
                <div className="text-[11px] font-bold text-[#171A1F] uppercase tracking-wider">
                  Typical Notice Scenarios:
                </div>
                <div className="space-y-1.5 text-xs text-[#69717D]">
                  {p.useCases.map((uc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#15803D] font-bold">✓</span>
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Confidentiality Commitment */}
      <div className="bg-[#172C4D] text-[#F7F6F2] rounded-2xl p-8 sm:p-12 shadow-md space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
          <Lock className="w-4 h-4 text-[#B99A62]" />
          <span>Client Confidentiality Principles</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your company tax documents remain strictly private
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#D7D4CC]">
          <div>
            <div className="font-bold text-white mb-1">Zero Public Model Training</div>
            <p className="leading-relaxed">Your financials, turnover figures, and supplier lists are never ingested into open foundational models.</p>
          </div>
          <div>
            <div className="font-bold text-white mb-1">Client-Side Verification</div>
            <p className="leading-relaxed">DIN checks, token similarity calculations, and hash integrity are computed directly in secure sandboxes.</p>
          </div>
          <div>
            <div className="font-bold text-white mb-1">Statutory Non-Disclosure</div>
            <p className="leading-relaxed">Documents are accessible only by your designated company directors, accountants, and verified advisors.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-[#A3AAB5]">Empowering Indian enterprise compliance with confidence.</span>
          <Link
            to="/app"
            className="px-5 py-2.5 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2"
          >
            <span>Launch Company Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
