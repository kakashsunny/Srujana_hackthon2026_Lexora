import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Check, 
  ChevronRight, 
  Sparkles,
  Layers,
  Scale,
  FileCheck2,
  Building2,
  Briefcase
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. Hero Section — Cinematic First Impression */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center border-b border-[#E7E5DF] overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E5DF] rounded-md shadow-2xs">
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
                <Link
                  to="/app"
                  className="px-6 py-3.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2.5 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-[#B99A62] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="px-5 py-3.5 bg-white hover:bg-[#F7F6F2] text-[#171A1F] border border-[#E7E5DF] text-sm font-semibold rounded-lg shadow-2xs transition-colors"
                >
                  Explore How It Works
                </Link>
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
              <div className="w-full max-w-md bg-white rounded-2xl border border-[#E7E5DF] shadow-xl p-5 sm:p-6 space-y-4 relative">
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
                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                      <span className="font-semibold text-[#171A1F]">Sender verification:</span>
                      <span className="text-[11px] font-mono text-[#B91C1C]">Non-gov domain</span>
                    </div>
                    <span className="text-[10px] text-[#B91C1C] font-semibold">Flagged</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B45309]" />
                      <span className="font-semibold text-[#171A1F]">Reference matching:</span>
                      <span className="text-[11px] font-mono text-[#69717D]">DIN Checksum</span>
                    </div>
                    <span className="text-[10px] text-[#B45309] font-semibold">62% Mismatch</span>
                  </div>

                  <div className="p-2.5 bg-white rounded-lg border border-[#E7E5DF] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                      <span className="font-semibold text-[#171A1F]">Evidence review:</span>
                      <span className="text-[11px] text-[#48505E]">3 Enclosures identified</span>
                    </div>
                    <span className="text-[10px] text-[#15803D] font-semibold">Ready</span>
                  </div>

                  <div className="p-2.5 bg-[#FEF2F2] rounded-lg border border-[#FECACA] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#B91C1C]" />
                      <span className="font-semibold text-[#171A1F]">Deadline identified:</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#B91C1C]">26 Oct 2026 (Urgent)</span>
                  </div>
                </div>

                {/* Preview Action Link */}
                <div className="pt-2">
                  <Link
                    to="/authenticity"
                    className="w-full py-2 bg-[#172C4D] hover:bg-[#112038] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Inspect In Authenticity Lab</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B99A62]" />
                  </Link>
                </div>

                <div className="text-[10px] text-center text-[#8F97A3]">
                  Illustrative demo preview · Client confidential
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Value Triad (Three Pillars with Direct Page Links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
            Three Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#171A1F] tracking-tight">
            Comprehensive legal notice intelligence
          </h2>
          <p className="text-sm text-[#48505E]">
            Everything small businesses, founders, and finance teams need to navigate statutory scrutiny with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">Understand Every Notice</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Translate dense administrative jargon into plain English. Identify the underlying allegation, cited statutory provisions, and ordered next steps.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E7E5DF] mt-6">
              <Link
                to="/features"
                className="text-xs font-semibold text-[#172C4D] hover:text-[#B99A62] flex items-center gap-1 transition-colors"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">Investigate Suspicious Notices</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Spot spoofed domains, non-standard DIN structures, and extortion payment channels before making statutory disclosures or transfers.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E7E5DF] mt-6">
              <Link
                to="/authenticity"
                className="text-xs font-semibold text-[#172C4D] hover:text-[#B99A62] flex items-center gap-1 transition-colors"
              >
                <span>Authenticity Intelligence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-[#E7E5DF] p-6 shadow-xs flex flex-col justify-between hover:border-[#172C4D]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">Never Miss a Deadline</h3>
              <p className="text-xs text-[#48505E] leading-relaxed">
                Organize response dates, enclosures, and reminder milestones while accounting for General Clauses Act business-day rules.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E7E5DF] mt-6">
              <Link
                to="/how-it-works"
                className="text-xs font-semibold text-[#172C4D] hover:text-[#B99A62] flex items-center gap-1 transition-colors"
              >
                <span>How It Works</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Authentic Industry Presence Strip */}
      <section className="bg-white border-y border-[#E7E5DF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
                Built For Indian Jurisdictions
              </div>
              <h3 className="text-2xl font-bold text-[#171A1F] mt-1">
                From GST DRC-01 to Section 138 Cheque Demands
              </h3>
            </div>
            <Link
              to="/businesses"
              className="px-4 py-2 bg-[#F7F6F2] hover:bg-[#EBE8E0] border border-[#E7E5DF] text-xs font-semibold text-[#172C4D] rounded-md transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View Business Use Cases</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B99A62]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF]">
              <div className="font-bold text-[#172C4D] text-sm">GST / CBIC</div>
              <div className="text-[#69717D] mt-1 font-sans text-[11px]">Form GST DRC-01, DRC-07 &amp; ITC Scrutiny under Sec 73/74</div>
            </div>
            <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF]">
              <div className="font-bold text-[#172C4D] text-sm">Income Tax / CBDT</div>
              <div className="text-[#69717D] mt-1 font-sans text-[11px]">Section 143(2) Scrutiny &amp; 144B Faceless Assessment proceedings</div>
            </div>
            <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF]">
              <div className="font-bold text-[#172C4D] text-sm">Labour / EPFO</div>
              <div className="text-[#69717D] mt-1 font-sans text-[11px]">Section 7A Summons, 8A contractor liability &amp; ESIC audit inspections</div>
            </div>
            <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF]">
              <div className="font-bold text-[#172C4D] text-sm">Court &amp; Commercial</div>
              <div className="text-[#69717D] mt-1 font-sans text-[11px]">Section 138 NI Act statutory 15-day cheque dishonour demand letters</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strong Closing CTA Banner */}
      <section className="relative py-20 lg:py-24 border-t border-[#E7E5DF] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/legal_editorial_desk_1792858142815.jpg"
            alt="Legal editorial desk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#172C4D]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            More clarity. Fewer missed deadlines.
          </h2>
          <p className="text-base text-[#D7D4CC] max-w-xl mx-auto leading-relaxed">
            Know what arrived, understand what matters, and decide what to do next.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app"
              className="px-6 py-3.5 bg-[#B99A62] hover:bg-[#A38652] text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/features"
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-lg transition-colors"
            >
              Explore the Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
