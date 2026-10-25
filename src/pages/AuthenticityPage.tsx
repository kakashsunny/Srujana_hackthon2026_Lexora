import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  ExternalLink,
  Layers,
  Search,
  ScanLine,
  Lock,
  FileCheck2
} from 'lucide-react';

export const AuthenticityPage: React.FC = () => {
  return (
    <div className="space-y-20 py-12 sm:py-20">
      {/* 1. Signature Hero Header (Deep Royal Navy) */}
      <section className="bg-[#172C4D] text-[#F7F6F2] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DF] relative overflow-hidden">
        {/* Background ambient desk graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden lg:block">
          <img
            src="/src/assets/images/authenticity_investigation_desk_1792861035430.jpg"
            alt="Forensic investigation desk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-md text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Forensic Document Investigation Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.1]">
            Look beyond the letterhead.
          </h1>

          <p className="text-sm sm:text-base text-[#D7D4CC] max-w-2xl leading-relaxed">
            An official-looking seal or government logo is not proof of authenticity. Scammers and extortionists routinely fabricate letterheads to intimidate business owners into immediate payment. Our Authenticity Intelligence investigates structural invariants to help you verify before you panic.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/app"
              className="px-6 py-3.5 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Test Live Forensic Scanner in App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Five Forensic Invariant Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
            Multi-Signal Verification Suite
          </div>
          <h2 className="text-3xl font-bold text-[#171A1F] tracking-tight">
            How we detect suspicious document indicators
          </h2>
          <p className="text-sm text-[#48505E]">
            We evaluate documents against five distinct structural dimensions, separating document authenticity concerns from statutory legal seriousness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 01</span>
              <span className="text-[10px] text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded font-bold font-mono">
                DOMAIN
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Sender Domain &amp; Origin Check</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Examines originating email headers and dispatch routing. CBIC and CBDT notices are strictly sent from authorized <code className="text-[#172C4D] font-mono">@gov.in</code> or <code className="text-[#172C4D] font-mono">@icegate.gov.in</code> servers, never commercial <code className="text-[#B91C1C] font-mono">.org</code> or <code className="text-[#B91C1C] font-mono">.com</code> lookalikes.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 02</span>
              <span className="text-[10px] text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded font-bold font-mono">
                DIN MANDATE
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Statutory DIN Checksum Validation</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              As per CBIC Circular 122/41/2019-GST and CBDT mandates, communications issued without a valid computer-generated Document Identification Number (DIN) are legally non-est (invalid). We check the 20-digit alphanumeric structure and checksum.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 03</span>
              <span className="text-[10px] text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded font-bold font-mono">
                PAYMENT CHANNELS
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Private UPI &amp; QR Code Detection</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Government taxes in India CANNOT be paid via personal UPI IDs (<code className="text-[#B91C1C] font-mono">@okaxis</code>, <code className="text-[#B91C1C] font-mono">@ybl</code>) or quick-pay QR codes. Legitimate liabilities require authenticated PMT-06 or ITNS challans.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 04</span>
              <span className="text-[10px] text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded font-bold font-mono">
                FUZZY MINING
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Multi-Signal Similarity Matching</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Compares claimed authority titles and department profiles against an institutional dataset using Levenshtein distance and token n-grams to catch subtle lookalike imitations.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 05</span>
              <span className="text-[10px] text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded font-bold font-mono">
                COERCION
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Coercive Threat Language Analysis</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Scans for implausible extortion threats (e.g. "immediate arrest within 24 hours" without statutory show-cause timeline). Legitimate administrative procedures provide mandatory 15-to-30 day windows.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#B99A62]">PILLAR 06</span>
              <span className="text-[10px] text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded font-bold font-mono">
                PORTAL HOOK
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">Direct Official Portal Verification</h3>
            <p className="text-xs text-[#69717D] leading-relaxed">
              Provides direct authenticated navigation links to cbic.gov.in/din and incometax.gov.in so business owners can verify documents at the definitive government source.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Forensic Case Study Diff Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E7E5DF] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#B99A62] uppercase tracking-wider">
              Comparative Analysis
            </div>
            <h2 className="text-2xl font-bold text-[#171A1F]">
              Real-World Discrepancy Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-[#48505E]">
              Here is how a fraudulent GST notice compares side-by-side with a genuine CBIC communication.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F6F2] text-[#69717D] font-semibold border-b border-[#E7E5DF]">
                <tr>
                  <th className="py-3 px-4">Inspection Parameter</th>
                  <th className="py-3 px-4 text-[#B91C1C]">Fraudulent Notice Pattern</th>
                  <th className="py-3 px-4 text-[#15803D]">Genuine Official Mandate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5DF] font-mono text-[11px]">
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-[#171A1F]">Originating Domain</td>
                  <td className="py-3 px-4 text-[#B91C1C]">recovery-officer@cbic-gov-portal.org</td>
                  <td className="py-3 px-4 text-[#15803D]">donotreply@cbic.gov.in</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-[#171A1F]">DIN Structure</td>
                  <td className="py-3 px-4 text-[#B91C1C]">202609CBIC89X004 (16 chars, bad checksum)</td>
                  <td className="py-3 px-4 text-[#15803D]">20260408194400982341 (20 chars alphanumeric)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-[#171A1F]">Payment Instruction</td>
                  <td className="py-3 px-4 text-[#B91C1C]">Scan QR or pay UPI: gstin.recovery@okaxis</td>
                  <td className="py-3 px-4 text-[#15803D]">Form GST PMT-06 Challan on services.gst.gov.in</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-sans font-semibold text-[#171A1F]">Response Timeline</td>
                  <td className="py-3 px-4 text-[#B91C1C]">5-day threat under penalty of instant arrest</td>
                  <td className="py-3 px-4 text-[#15803D]">30 statutory days as per CGST Section 73(8)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Responsible AI Disclaimer */}
          <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] text-xs text-[#69717D] leading-relaxed">
            <strong>Important Limitation:</strong> Digital forensic analysis is an evidentiary assistance tool. It surfaces patterns, irregularities, and known impersonation tactics. It cannot replace certified physical document examination or direct portal login. Always cross-check case status on the official portal before transferring funds.
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-2xl font-bold text-[#171A1F]">Examine your documents in the Authenticity Lab</h3>
        <p className="text-xs text-[#69717D]">
          Test real-time multi-stage forensic audit animations with inspectable signals.
        </p>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#172C4D] hover:bg-[#112038] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <span>Open Authenticity Lab in Workspace</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B99A62]" />
        </Link>
      </section>
    </div>
  );
};
