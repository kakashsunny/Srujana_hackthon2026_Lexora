import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Search, 
  AlertTriangle, 
  Scale, 
  Layers, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  UserCheck, 
  Briefcase,
  ChevronRight,
  ExternalLink,
  Lock,
  Eye,
  Check,
  X
} from 'lucide-react';
import { BrandLogo } from '../layout/BrandLogo';

interface LandingPageProps {
  onNavigateToApp: (initialTab?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToApp }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [selectedDemoAccount, setSelectedDemoAccount] = useState<'director' | 'accountant'>('director');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171A1F] antialiased selection:bg-[#172C4D] selection:text-[#F7F6F2]">
      {/* 1. Public Marketing Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E7E5DF] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          {/* Brand Mark */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 shrink-0"
          >
            <BrandLogo size="md" showTagline={true} />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#48505E]">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-[#172C4D] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-[#172C4D] transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('authenticity')} 
              className="hover:text-[#172C4D] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Authenticity Intelligence</span>
              <span className="text-[9px] uppercase tracking-wider text-[#B99A62] bg-[#B99A62]/10 px-1.5 py-0.2 rounded-xs font-mono">
                Forensics
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('for-businesses')} 
              className="hover:text-[#172C4D] transition-colors cursor-pointer"
            >
              For Businesses
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSignInModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-[#172C4D] hover:text-[#112038] hover:bg-black/5 rounded-md transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigateToApp()}
              className="px-4 py-2 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99A62] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section — Cinematic First Impression */}
      <section id="hero" className="relative min-h-[640px] lg:min-h-[720px] flex items-center border-b border-[#E7E5DF] overflow-hidden">
        {/* Full-width Cinematic Indian Legaltech Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_indian_legaltech_desk_1792861033728.jpg"
            alt="Cinematic Indian legal-tech workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-right"
          />
          {/* Subtle Measured Scrim Overlay: Keeps left 55% light & low contrast for headlines */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F6F2] via-[#F7F6F2]/95 lg:via-[#F7F6F2]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F2] via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 55% Headline & Proposition */}
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-[#E7E5DF] rounded-md shadow-2xs backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
                <span className="text-[11px] font-bold text-[#172C4D] tracking-wider uppercase">
                  AI-Powered Legal Notice Intelligence
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171A1F] tracking-tight leading-[1.15]">
                A legal notice shouldn't leave you guessing.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#48505E] leading-relaxed">
                Understand government and legal notices, investigate suspicious documents, prepare your next steps, and keep every deadline under control — all in one place.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigateToApp()}
                  className="px-6 py-3.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-[#B99A62] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-5 py-3.5 bg-white/90 hover:bg-white text-[#171A1F] border border-[#E7E5DF] text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Explore How It Works
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center gap-3 text-xs text-[#69717D]">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                  <span>Built for India's small businesses &amp; founders</span>
                </div>
                <span>·</span>
                <span>CBIC, CBDT &amp; Labour jurisdiction ready</span>
              </div>
            </div>

            {/* Right Product-Preview Composition (Floating Glimpse Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-[#E7E5DF] shadow-xl p-5 sm:p-6 space-y-4 relative">
                {/* Simulated Floating Header Tag */}
                <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#172C4D] flex items-center justify-center text-white text-[10px] font-bold">
                      §
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#171A1F]">Intelligence Triage Preview</div>
                      <div className="text-[10px] font-mono text-[#69717D]">Ref: DRC-01/GST/2026/8941</div>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono uppercase bg-[#F7F6F2] text-[#B99A62] px-2 py-0.5 rounded border border-[#E7E5DF]">
                    Demo Data
                  </span>
                </div>

                {/* Document Excerpt snippet */}
                <div className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-1.5">
                  <div className="text-[10px] font-semibold text-[#69717D] uppercase">
                    Extracted Subject
                  </div>
                  <div className="text-xs font-bold text-[#171A1F] leading-snug">
                    Show Cause Notice under Section 73 (Input Tax Credit Mismatch)
                  </div>
                  <div className="text-[11px] text-[#48505E]">
                    Alleged discrepancy of ₹3,42,500 between GSTR-3B and GSTR-2B.
                  </div>
                </div>

                {/* 4 Forensic Inspection Checkpoints */}
                <div className="space-y-2 pt-1 text-xs">
                  {/* Item 1: Sender verification */}
                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                      <span className="font-semibold text-[#171A1F]">Sender verification:</span>
                      <span className="text-[11px] font-mono text-[#B91C1C]">Non-gov domain</span>
                    </div>
                    <span className="text-[10px] text-[#B91C1C] font-semibold">Flagged</span>
                  </div>

                  {/* Item 2: Reference matching */}
                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                      <span className="font-semibold text-[#171A1F]">Reference matching:</span>
                      <span className="text-[11px] font-mono text-[#69717D]">DIN Checksum</span>
                    </div>
                    <span className="text-[10px] text-[#B45309] font-semibold">62% Mismatch</span>
                  </div>

                  {/* Item 3: Evidence review */}
                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                      <span className="font-semibold text-[#171A1F]">Evidence review:</span>
                      <span className="text-[11px] text-[#48505E]">3 Enclosures identified</span>
                    </div>
                    <span className="text-[10px] text-[#15803D] font-semibold">Ready</span>
                  </div>

                  {/* Item 4: Deadline identified */}
                  <div className="p-2.5 bg-[#FEF2F2]/60 rounded-lg border border-[#FECACA] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span className="font-semibold text-[#171A1F]">Deadline identified:</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B91C1C]">26 Oct 2026 (Urgent)</span>
                  </div>
                </div>

                {/* Preview Action Link */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigateToApp('authenticity')}
                    className="w-full py-2 bg-[#172C4D] hover:bg-[#112038] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Inspect In Interactive Lab</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B99A62]" />
                  </button>
                </div>

                <div className="text-[10px] text-center text-[#8F97A3]">
                  Illustrative demo preview · Client confidential
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Benefits Section */}
      <section id="features" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
            Transforming Legal Anxiety Into Control
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171A1F] tracking-tight">
            Built to protect your business at every step
          </h2>
          <p className="text-sm text-[#48505E]">
            Government notices should not require days of panicked research. Lexora provides instant clarity, evidence-backed safety, and strict deadline execution.
          </p>
        </div>

        {/* Benefit 1: Understand Every Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm shadow-xs">
              01
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
              Understand every notice in plain language
            </h3>
            <p className="text-sm text-[#48505E] leading-relaxed">
              Legal documents are written in dense administrative jargon. We immediately unpack who sent it, why your business received it, which statutory sections are cited (like CGST Section 73 or Income Tax 143(2)), and the exact, ordered steps required to comply.
            </p>
            <ul className="space-y-2.5 text-xs text-[#171A1F]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Plain English breakdown with dual Kannada localization support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Identification of root causes (e.g. supplier GSTR-1 mismatches, turnover variance)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Specific guidance on whether a CA, Advocate, or CS is required</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
              <span className="font-semibold text-[#172C4D]">Plain-Language Conversion Sample</span>
              <span className="text-[10px] text-[#69717D] font-mono">Sec 143(2) IT Act</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] text-xs">
                <div className="text-[10px] text-[#69717D] uppercase font-semibold mb-1">Dense Extracted Wording:</div>
                <p className="font-mono text-[11px] text-[#69717D] italic">
                  "Whereas the return of income for AY 2025-26 has been selected for Complete Scrutiny under CASS on account of variance between Form 26AS gross receipts..."
                </p>
              </div>

              <div className="p-3.5 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0] text-xs text-[#14532D]">
                <div className="text-[10px] text-[#15803D] uppercase font-bold mb-1">What It Actually Means:</div>
                <p className="font-medium text-[12px] leading-relaxed">
                  Your tax return is undergoing routine faceless scrutiny because your reported sales in your tax audit (₹4.2 Cr) differed from TDS turnover reported by clients in Form 26AS (₹4.85 Cr). Prepare your reconciliation statement and submit via the e-filing portal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit 2: Investigate Suspicious Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
              <span className="font-semibold text-[#B91C1C] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Forensic Red-Flag Findings</span>
              </span>
              <span className="text-[10px] font-mono text-[#69717D]">DRC-01 Audit</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#FEF2F2] rounded-lg border border-[#FECACA] flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#B91C1C]">Private UPI Payment Handle Detected</div>
                  <div className="text-[11px] text-[#7F1D1D] mt-0.5">
                    "gstin.recovery.dept@okaxis" — Government taxes in India CANNOT be paid via personal UPI IDs or unsolicited QR codes.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FEF2F2] rounded-lg border border-[#FECACA] flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#B91C1C]">Non-Standard DIN Checksum Failure</div>
                  <div className="text-[11px] text-[#7F1D1D] mt-0.5">
                    DIN "202609CBIC89X004" is 16 characters. Valid CBIC circular mandates 20-digit computer-generated DINs.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm shadow-xs">
              02
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
              Investigate suspicious notices before you pay
            </h3>
            <p className="text-sm text-[#48505E] leading-relaxed">
              Tax extortion scams and phishing notices impersonating CBIC and Income Tax departments are on the rise across Indian industrial hubs. Our forensic lab analyzes email routing, structural DIN rules, and unauthorized payment channels to help you spot red flags immediately.
            </p>
            <ul className="space-y-2.5 text-xs text-[#171A1F]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Detection of private bank accounts, UPI handles, and spoofed domains</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Algorithmic validation against official CBIC &amp; CBDT DIN standards</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Direct verified portal search links to verify notices at the source</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Benefit 3: Never Miss a Deadline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm shadow-xs">
              03
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
              Never lose track of a statutory deadline
            </h3>
            <p className="text-sm text-[#48505E] leading-relaxed">
              Missing a legal deadline can result in ex-parte tax orders, bank freezes, or forfeiture of appeal rights. Lexora accounts for General Clauses Act business-day rules, gazetted holidays, and electronic service timestamps to keep your directors alerted.
            </p>
            <ul className="space-y-2.5 text-xs text-[#171A1F]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Explicit statutory deadlines differentiated from inferred procedural rules</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>End-to-end lifecycle milestones: Received → Analyzed → Drafted → Filed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Automated reminder schedules for finance directors and accountants</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3 text-xs">
              <span className="font-semibold text-[#171A1F] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#172C4D]" />
                <span>Statutory Calendar &amp; Milestone Timeline</span>
              </span>
              <span className="text-[10px] text-[#15803D] font-bold">Sec 10 Compliant</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#171A1F]">Section 138 Cheque Demand Notice</div>
                  <div className="text-[11px] text-[#69717D]">Statutory 15-day cure window</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-[#B91C1C]">04 Nov 2026</div>
                  <div className="text-[10px] text-[#69717D]">11 days left</div>
                </div>
              </div>

              <div className="p-3 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#171A1F]">EPFO Section 7A Summon Hearing</div>
                  <div className="text-[11px] text-[#69717D]">Regional PF Commissioner II, Bangalore</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-[#172C4D]">04 Nov 2026</div>
                  <div className="text-[10px] text-[#69717D]">Hearing: 11:30 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual "How It Works" Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-[#E7E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
              A Transparent Four-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#171A1F] tracking-tight">
              How Lexora works
            </h2>
            <p className="text-sm text-[#48505E]">
              From the moment an envelope lands on your desk or an email arrives, our platform turns legal confusion into an orderly, evidence-backed workflow.
            </p>
          </div>

          {/* 4-Step Horizontal Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-3 relative group hover:border-[#172C4D]/40 transition-colors">
              <div className="text-xs font-mono font-bold text-[#B99A62]">01</div>
              <h3 className="text-base font-bold text-[#171A1F]">Receive a notice</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Forward a government email or upload a scan/PDF. The document is securely indexed in your encrypted evidentiary vault.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-3 relative group hover:border-[#172C4D]/40 transition-colors">
              <div className="text-xs font-mono font-bold text-[#B99A62]">02</div>
              <h3 className="text-base font-bold text-[#171A1F]">Understand &amp; investigate</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                The forensic engine inspects DIN formats, sender addresses, and payment channels while generating an executive plain-English summary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-3 relative group hover:border-[#172C4D]/40 transition-colors">
              <div className="text-xs font-mono font-bold text-[#B99A62]">03</div>
              <h3 className="text-base font-bold text-[#171A1F]">Prepare your response</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Compile required enclosures, check factual points, generate a formal response draft, and export a brief for your CA or advocate.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] space-y-3 relative group hover:border-[#172C4D]/40 transition-colors">
              <div className="text-xs font-mono font-bold text-[#B99A62]">04</div>
              <h3 className="text-base font-bold text-[#171A1F]">Track the deadline</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Monitor approaching dates on a business-day calendar with automated alerts until acknowledgement numbers are filed and the matter is resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Signature Authenticity Intelligence Showcase (Dark Royal Navy) */}
      <section id="authenticity" className="py-24 bg-[#172C4D] text-[#F7F6F2] relative overflow-hidden">
        {/* Subtle background ambient graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden lg:block">
          <img
            src="/src/assets/images/authenticity_investigation_desk_1792861035430.jpg"
            alt="Forensic investigation"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B99A62]" />
              <span>Signature Capability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Look beyond the letterhead.
            </h2>
            <p className="text-sm text-[#D7D4CC] leading-relaxed">
              An official-looking seal or government logo is not proof of authenticity. Fake notices frequently copy legitimate templates to coerce immediate payment. Our Authenticity Intelligence examines structural invariants to help you investigate before making statutory disclosures.
            </p>
          </div>

          {/* Forensic Evidence Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#B99A62]">01 / DOMAIN INVARIANT</span>
                <span className="text-[10px] text-[#FCA5A5] bg-[#B91C1C]/30 px-2 py-0.5 rounded font-bold">
                  SPOOFED
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Sender-Domain Lookalikes</h3>
              <p className="text-xs text-[#D7D4CC] leading-relaxed">
                Flags senders using commercial extensions like <code className="text-amber-200">@cbic-gov-portal.org</code> instead of authorized government infrastructure (<code className="text-emerald-300">@cbic.gov.in</code>).
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#B99A62]">02 / STATUTORY IDENTIFIER</span>
                <span className="text-[10px] text-[#FCA5A5] bg-[#B91C1C]/30 px-2 py-0.5 rounded font-bold">
                  CHECKSUM FAIL
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Notice DIN Structural Validation</h3>
              <p className="text-xs text-[#D7D4CC] leading-relaxed">
                Validates whether the Document Identification Number conforms to the 20-digit alphanumeric format mandated by CBIC Circular 122/41/2019-GST.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#B99A62]">03 / PAYMENT CHANNELS</span>
                <span className="text-[10px] text-[#FCA5A5] bg-[#B91C1C]/30 px-2 py-0.5 rounded font-bold">
                  EXTORTION RISK
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Suspicious Payment Scanners</h3>
              <p className="text-xs text-[#D7D4CC] leading-relaxed">
                Scans document text and QR codes for private UPI IDs (<code className="text-amber-200">@okaxis</code>). Official taxes are strictly settled via GST PMT-06 or ITNS challans.
              </p>
            </div>
          </div>

          {/* Action CTA & Responsible AI Disclaimer */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
            <div className="text-xs text-[#A3AAB5] max-w-xl">
              <strong>Simulated demonstration note:</strong> Digital forensic analysis surfaces anomalies and corroborating signals. It does not replace independent lookup on official government verification portals.
            </div>

            <button
              onClick={() => onNavigateToApp('authenticity')}
              className="px-5 py-3 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Explore Authenticity Intelligence in Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Built for Businesses Section */}
      <section id="for-businesses" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
            Operational Grounding
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171A1F] tracking-tight">
            Built for businesses that cannot afford to miss a notice
          </h2>
          <p className="text-sm text-[#48505E]">
            Designed for Indian enterprise workflows without corporate bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Persona 1 */}
          <div className="bg-white p-6 rounded-xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#F7F6F2] border border-[#E7E5DF] flex items-center justify-center text-[#172C4D]">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Small Businesses &amp; Retailers</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Navigate unexpected GST DRC-01 notices and municipal inquiries without panic. Understand if a notice is legitimate before paying.
            </p>
          </div>

          {/* Persona 2 */}
          <div className="bg-white p-6 rounded-xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#F7F6F2] border border-[#E7E5DF] flex items-center justify-center text-[#172C4D]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Startup Founders</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Keep statutory compliance under control across direct tax, MCA filings, and intellectual property notices while focusing on company growth.
            </p>
          </div>

          {/* Persona 3 */}
          <div className="bg-white p-6 rounded-xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#F7F6F2] border border-[#E7E5DF] flex items-center justify-center text-[#172C4D]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Accountants &amp; Finance Teams</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Generate structured reconciliation briefs, organize GSTR-2B vs 3B audit sheets, and draft factual submissions for management sign-off.
            </p>
          </div>

          {/* Persona 4 */}
          <div className="bg-white p-6 rounded-xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-[#F7F6F2] border border-[#E7E5DF] flex items-center justify-center text-[#172C4D]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Operations &amp; HR Heads</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Handle EPFO Section 7A contractor summons, ESIC inspections, and vendor demand letters with complete evidentiary document readiness.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Strong Closing CTA Banner */}
      <section className="relative py-20 lg:py-24 border-t border-[#E7E5DF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/legal_editorial_desk_1792858142815.jpg"
            alt="Legal editorial desk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#172C4D]/85 backdrop-blur-2xs" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            More clarity. Fewer missed deadlines.
          </h2>
          <p className="text-base text-[#D7D4CC] max-w-xl mx-auto leading-relaxed">
            Know what arrived, understand what matters, and decide what to do next.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToApp()}
              className="px-6 py-3.5 bg-[#B99A62] hover:bg-[#A38652] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Explore the Features
            </button>
          </div>
        </div>
      </section>

      {/* 8. Compact Editorial Footer */}
      <footer className="bg-white border-t border-[#E7E5DF] text-xs text-[#69717D] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E7E5DF]">
            <BrandLogo size="md" showTagline={true} />

            <div className="flex flex-wrap items-center gap-6 font-medium text-[#48505E]">
              <button onClick={() => scrollToSection('hero')} className="hover:text-[#172C4D]">Product</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-[#172C4D]">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#172C4D]">How It Works</button>
              <button onClick={() => onNavigateToApp()} className="hover:text-[#172C4D] font-bold text-[#172C4D]">Launch App</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} Lexora. Legal Intelligence &amp; Forensics.
            </p>
            <p className="max-w-xl text-[10px] text-[#8F97A3]">
              <strong>Disclaimer:</strong> Lexora provides informational assistance and document analysis for business operations. It does not provide legal advice or create an attorney-client relationship. Always verify notices on official government portals.
            </p>
          </div>
        </div>
      </footer>

      {/* 9. Sign In / Role Selection Modal */}
      {signInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E7E5DF] max-w-sm w-full p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#172C4D]" />
                <h3 className="text-sm font-bold text-[#171A1F]">Sign In to Notice Vault</h3>
              </div>
              <button
                onClick={() => setSignInModalOpen(false)}
                className="text-[#69717D] hover:text-[#171A1F]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#48505E] leading-relaxed">
              Select your simulated role to access the workspace for <strong>Apex Precision Tools Private Limited</strong>:
            </p>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => setSelectedDemoAccount('director')}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedDemoAccount === 'director' ? 'bg-[#F7F6F2] border-[#172C4D]' : 'bg-white border-[#E7E5DF]'}`}
              >
                <div className="font-bold text-[#171A1F]">Managing Director / Founder</div>
                <div className="text-[11px] text-[#69717D]">Full administrative overview, priority triage, and CA consultation briefs.</div>
              </div>

              <div
                onClick={() => setSelectedDemoAccount('accountant')}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedDemoAccount === 'accountant' ? 'bg-[#F7F6F2] border-[#172C4D]' : 'bg-white border-[#E7E5DF]'}`}
              >
                <div className="font-bold text-[#171A1F]">Finance &amp; Tax Accountant</div>
                <div className="text-[11px] text-[#69717D]">GSTR reconciliations, statutory reply builder, and document enclosure management.</div>
              </div>
            </div>

            <button
              onClick={() => {
                setSignInModalOpen(false);
                onNavigateToApp();
              }}
              className="w-full py-2.5 bg-[#172C4D] hover:bg-[#112038] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Workspace</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99A62]" />
            </button>

            <div className="text-[10px] text-center text-[#8F97A3]">
              Simulated enterprise session · No password required
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
