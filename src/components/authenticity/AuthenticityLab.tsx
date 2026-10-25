import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Mail, 
  Info, 
  RefreshCw, 
  ArrowRight,
  ScanLine,
  Layers,
  Scale,
  CreditCard,
  UserCheck,
  FileSearch,
  BadgeAlert
} from 'lucide-react';
import { Notice, EvidenceFinding, EvidenceProvenance } from '../../types';

interface AuthenticityLabProps {
  selectedNotice: Notice;
  allNotices: Notice[];
  onSelectNoticeId: (id: string) => void;
  onNavigateToAnalysis: () => void;
}

export const AuthenticityLab: React.FC<AuthenticityLabProps> = ({
  selectedNotice,
  allNotices,
  onSelectNoticeId,
  onNavigateToAnalysis
}) => {
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditStep, setAuditStep] = useState<number>(5); // 0 to 5 (5 = completed)
  const [expandedCardId, setExpandedCardId] = useState<string | null>('F-PAY-UPI');
  const [activePillarTab, setActivePillarTab] = useState<'all' | 'sender' | 'identifier' | 'payment' | 'consistency'>('all');
  const [emailForwardModal, setEmailForwardModal] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const auditSteps = [
    'Parsing Document Header, Origin Routing & Mail Envelope...',
    'Validating Document Identification Number (DIN) Checksums & CBIC/CBDT Rules...',
    'Mining Institutional Reference Data via Levenshtein Distance & Token Jaccard...',
    'Analyzing Statutory Timelines, Natural Justice & Invariant Consistency...',
    'Scanning for Coercive Language Patterns & Unauthorized Private Payment Channels...'
  ];

  const runLiveAudit = () => {
    setIsAuditing(true);
    setAuditStep(0);
    const interval = setInterval(() => {
      setAuditStep((prev) => {
        if (prev >= auditSteps.length - 1) {
          clearInterval(interval);
          setIsAuditing(false);
          return auditSteps.length;
        }
        return prev + 1;
      });
    }, 450);
  };

  const assessment = selectedNotice.authenticity;
  const isSuspicious = assessment.outcome === 'suspicious';
  const isUnableToVerify = assessment.outcome === 'unable_to_verify';
  const riskScore = assessment.riskScore ?? (isSuspicious ? 88 : isUnableToVerify ? 42 : 12);
  const riskBreakdown = assessment.riskBreakdown ?? {
    senderScore: isSuspicious ? 95 : 10,
    identifierScore: isSuspicious ? 88 : 10,
    paymentScore: isSuspicious ? 98 : 5,
    consistencyScore: isSuspicious ? 70 : 15,
    coercionScore: isSuspicious ? 90 : 10,
    compositeRiskScore: riskScore
  };

  // Helper for rendering provenance badges
  const renderProvenanceBadge = (provenance?: EvidenceProvenance) => {
    switch (provenance) {
      case 'verified_fact':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF5EE] text-[#1E7E34] border border-[#C3E6CB]">
            <CheckCircle className="w-3 h-3" />
            <span>VERIFIED FACT</span>
          </span>
        );
      case 'ai_finding':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]">
            <ScanLine className="w-3 h-3" />
            <span>AI FORENSIC FINDING</span>
          </span>
        );
      case 'unverified':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F1F3F5] text-[#495057] border border-[#DEE2E6]">
            <Info className="w-3 h-3" />
            <span>UNVERIFIED DOCUMENT ASSERTION</span>
          </span>
        );
    }
  };

  // Filter findings by active pillar
  const filteredFindings = assessment.findings.filter((f) => {
    if (activePillarTab === 'all') return true;
    return f.category === activePillarTab;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header & Intake Section */}
      <div className="relative rounded-xl border border-[#E7E5DF] overflow-hidden bg-white p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Ambient Investigation Workspace Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/src/assets/images/authenticity_investigation_desk_1792861035430.jpg"
            alt="Investigation workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
            <span>Forensic Document Investigation &amp; Verification</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F] mt-1 tracking-tight">
            Authenticity Lab
          </h1>
          <p className="text-xs text-[#69717D] mt-0.5 max-w-2xl leading-relaxed">
            Multi-signal audit engine powered by verified government reference catalogs, DIN checksum validation, Levenshtein fuzzy analysis, and anomaly detection.
          </p>
        </div>

        {/* Preset Selectors & Upload Affordance */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          {/* Sample Preset Switcher */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-[#E7E5DF] text-xs">
            <span className="px-2 text-[11px] font-semibold text-[#69717D]">Preset:</span>
            {allNotices.map((n) => {
              const isCurrent = n.id === selectedNotice.id;
              const label = n.id === 'notice-gst-scam-01'
                ? 'Suspicious GST'
                : n.id === 'notice-it-scrutiny-02'
                ? 'IT Scrutiny'
                : n.id === 'notice-epfo-inquiry-03'
                ? 'EPFO Labour'
                : n.id === 'notice-karnataka-commercial-tax-05'
                ? 'Karnataka GST (Bilingual)'
                : 'NI 138 Court';
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    onSelectNoticeId(n.id);
                    runLiveAudit();
                  }}
                  className={`
                    px-2.5 py-1 text-xs font-medium rounded-sm transition-colors cursor-pointer
                    ${isCurrent ? 'bg-[#172C4D] text-[#F7F6F2]' : 'text-[#48505E] hover:text-[#171A1F] hover:bg-[#F7F6F2]'}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Email Forwarding Trigger */}
          <button
            onClick={() => setEmailForwardModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F7F6F2] border border-[#E7E5DF] text-xs font-medium text-[#171A1F] rounded-md transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#69717D]" />
            <span>Forward Notice</span>
          </button>

          {/* Re-Audit button */}
          <button
            onClick={runLiveAudit}
            disabled={isAuditing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F6F2] hover:bg-[#EBE8E0] border border-[#E7E5DF] text-xs font-medium text-[#172C4D] rounded-md transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-[#B99A62]' : ''}`} />
            <span>Re-Audit</span>
          </button>
        </div>
      </div>

      {/* 2. Simulated Audit Progress Banner */}
      {isAuditing && (
        <div className="bg-[#172C4D] text-[#F7F6F2] p-4 rounded-lg shadow-md border border-[#B99A62]/30 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <ScanLine className="w-4 h-4 text-[#B99A62] animate-pulse" />
              <span>Executing Multi-Stage Forensic Invariant Inspection</span>
            </div>
            <span className="font-mono text-[#B99A62] text-[11px]">
              Stage {Math.min(auditStep + 1, auditSteps.length)} of {auditSteps.length}
            </span>
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B99A62] h-full transition-all duration-300 ease-out"
              style={{ width: `${((auditStep + 1) / auditSteps.length) * 100}%` }}
            />
          </div>

          <div className="text-xs text-[#E7E5DF] font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B99A62] animate-ping" />
            <span>{auditSteps[auditStep] || 'Finalizing evaluation findings...'}</span>
          </div>
        </div>
      )}

      {/* 3. Statutory Non-Definitive Evidentiary Rule Disclaimer */}
      <div className="p-3.5 rounded-lg border border-[#D0C9B6] bg-[#FAF8F3] text-xs text-[#5D5545] flex items-start gap-3 shadow-2xs">
        <Scale className="w-4 h-4 text-[#B99A62] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#171A1F] flex items-center gap-2">
            <span>Statutory Non-Definitive Evidentiary Rule</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#EBE7DC] text-[#7A6A4E] font-medium">Standard of Inquiry</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#5D5545]">
            {assessment.statutoryDisclaimer ||
              'Lexora provides explainable forensic anomaly detection and pattern matching based on verified government reference standards. It does not declare documents definitively fraudulent or authentic without physical document inspection, official court discovery, or direct government registry confirmation. All findings must be reviewed by qualified legal or tax counsel.'}
          </p>
        </div>
      </div>

      {/* 4. Explainable Multi-Signal Risk Score & Gauge Panel */}
      <div className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5DF]">
          {/* Risk Level Badge & Summary */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {riskScore >= 60 ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#B91C1C] text-white rounded-md text-xs font-bold tracking-wide">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Suspicious</span>
                </div>
              ) : riskScore >= 30 ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#B45309] text-white rounded-md text-xs font-bold tracking-wide">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Requires Direct Verification</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#15803D] text-white rounded-md text-xs font-bold tracking-wide">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Appears Genuine</span>
                </div>
              )}

              <span className="text-xs text-[#69717D]">
                Ref: <span className="font-mono text-[#171A1F] font-semibold">{selectedNotice.referenceNumber}</span>
              </span>
              {selectedNotice.din && (
                <span className="text-xs text-[#69717D]">
                  · DIN: <span className="font-mono text-[#171A1F] font-semibold">{selectedNotice.din}</span>
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-[#171A1F]">
              {riskScore >= 60
                ? 'Document displays critical markers of tax impersonation or procedural anomaly.'
                : riskScore >= 30
                ? 'Document lacks public cryptographic verification; registry checks recommended.'
                : 'Sender, statutory citations, and payment procedures align with verified government standards.'}
            </h2>

            <p className="text-xs text-[#48505E] max-w-2xl leading-relaxed">
              {riskScore >= 60
                ? 'Notice demands payment outside official RBI/GST PMT-06 challan infrastructure or exhibits malformed DIN checksums. Do not disburse funds or share banking credentials.'
                : riskScore >= 30
                ? 'External public verification portals require departmental login credentials to confirm active service of this notice.'
                : 'Notice matches known institutional identifiers and does not request private transfers. Statutory response window applies.'}
            </p>
          </div>

          {/* Explainable Composite Risk Score Gauge */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E7E5DF] shrink-0 w-full sm:w-72 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#172C4D] uppercase tracking-wider">Composite Risk Score</span>
              <span className={`text-2xl font-black font-mono ${
                riskScore >= 60 ? 'text-[#B91C1C]' : riskScore >= 30 ? 'text-[#B45309]' : 'text-[#15803D]'
              }`}>
                {riskScore} / 100
              </span>
            </div>

            {/* Risk Gauge Bar */}
            <div className="space-y-1">
              <div className="w-full bg-[#E7E5DF] h-2.5 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-500 ${
                    riskScore >= 60 ? 'bg-[#B91C1C]' : riskScore >= 30 ? 'bg-[#B45309]' : 'bg-[#15803D]'
                  }`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#868E96] font-mono">
                <span>0 (Conforming)</span>
                <span>50 (Caution)</span>
                <span>100 (Suspicious)</span>
              </div>
            </div>

            <div className="text-[11px] text-[#69717D] pt-1 border-t border-[#E7E5DF] flex items-center justify-between">
              <span>Coverage Depth:</span>
              <span className="font-bold text-[#171A1F] font-mono">{assessment.confidenceScore}%</span>
            </div>
          </div>
        </div>

        {/* 5 Risk Pillars Interactive Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#171A1F] uppercase tracking-wider">
              5 Forensic Signal Pillars
            </h3>
            <span className="text-[11px] text-[#69717D]">
              Select a pillar to view targeted findings
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* 1. Sender */}
            <button
              onClick={() => setActivePillarTab(activePillarTab === 'sender' ? 'all' : 'sender')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activePillarTab === 'sender' ? 'border-[#172C4D] bg-[#172C4D]/5 ring-1 ring-[#172C4D]' : 'border-[#E7E5DF] bg-white hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <UserCheck className="w-4 h-4 text-[#172C4D]" />
                <span className={`font-mono text-xs font-bold ${
                  riskBreakdown.senderScore >= 60 ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}>
                  {riskBreakdown.senderScore}%
                </span>
              </div>
              <div className="text-xs font-semibold text-[#171A1F]">Sender Domain</div>
              <div className="text-[10px] text-[#69717D] truncate mt-0.5">SPF / Mail Server</div>
            </button>

            {/* 2. Identifier */}
            <button
              onClick={() => setActivePillarTab(activePillarTab === 'identifier' ? 'all' : 'identifier')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activePillarTab === 'identifier' ? 'border-[#172C4D] bg-[#172C4D]/5 ring-1 ring-[#172C4D]' : 'border-[#E7E5DF] bg-white hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <FileSearch className="w-4 h-4 text-[#172C4D]" />
                <span className={`font-mono text-xs font-bold ${
                  riskBreakdown.identifierScore >= 60 ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}>
                  {riskBreakdown.identifierScore}%
                </span>
              </div>
              <div className="text-xs font-semibold text-[#171A1F]">DIN Checksum</div>
              <div className="text-[10px] text-[#69717D] truncate mt-0.5">Structure &amp; Validity</div>
            </button>

            {/* 3. Payment */}
            <button
              onClick={() => setActivePillarTab(activePillarTab === 'payment' ? 'all' : 'payment')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activePillarTab === 'payment' ? 'border-[#172C4D] bg-[#172C4D]/5 ring-1 ring-[#172C4D]' : 'border-[#E7E5DF] bg-white hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <CreditCard className="w-4 h-4 text-[#172C4D]" />
                <span className={`font-mono text-xs font-bold ${
                  riskBreakdown.paymentScore >= 60 ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}>
                  {riskBreakdown.paymentScore}%
                </span>
              </div>
              <div className="text-xs font-semibold text-[#171A1F]">Payment Vector</div>
              <div className="text-[10px] text-[#69717D] truncate mt-0.5">UPI / QR Detection</div>
            </button>

            {/* 4. Consistency */}
            <button
              onClick={() => setActivePillarTab(activePillarTab === 'consistency' ? 'all' : 'consistency')}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                activePillarTab === 'consistency' ? 'border-[#172C4D] bg-[#172C4D]/5 ring-1 ring-[#172C4D]' : 'border-[#E7E5DF] bg-white hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <Scale className="w-4 h-4 text-[#172C4D]" />
                <span className={`font-mono text-xs font-bold ${
                  riskBreakdown.consistencyScore >= 60 ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}>
                  {riskBreakdown.consistencyScore}%
                </span>
              </div>
              <div className="text-xs font-semibold text-[#171A1F]">Statute Invariant</div>
              <div className="text-[10px] text-[#69717D] truncate mt-0.5">Sections &amp; Circulars</div>
            </button>

            {/* 5. Coercion */}
            <button
              onClick={() => setActivePillarTab(activePillarTab === 'all' ? 'all' : 'all')}
              className="p-3 rounded-lg border border-[#E7E5DF] bg-white hover:bg-[#F7F6F2] text-left transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <BadgeAlert className="w-4 h-4 text-[#172C4D]" />
                <span className={`font-mono text-xs font-bold ${
                  riskBreakdown.coercionScore >= 60 ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}>
                  {riskBreakdown.coercionScore}%
                </span>
              </div>
              <div className="text-xs font-semibold text-[#171A1F]">Due Process</div>
              <div className="text-[10px] text-[#69717D] truncate mt-0.5">Threat Pressure Scan</div>
            </button>
          </div>
        </div>

        {/* Checks Completed & Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs border-t border-[#E7E5DF]">
          <div>
            <div className="font-bold text-[#171A1F] flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Completed Forensic Checks ({assessment.checksCompleted.length})</span>
            </div>
            <ul className="space-y-1.5 text-[#48505E]">
              {assessment.checksCompleted.map((chk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#15803D] font-bold">✓</span>
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#171A1F] flex items-center gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Important Limitations &amp; Exclusions</span>
            </div>
            <ul className="space-y-1.5 text-[#69717D]">
              {assessment.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#B45309]">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Forensic Evidence Panels with Provenance Tags */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-[#171A1F]">
              Detailed Evidence Findings ({filteredFindings.length})
            </h3>
            <p className="text-xs text-[#69717D]">
              Each finding clearly displays its evidentiary provenance (Verified Statutory Fact vs AI Inferred Finding vs Document Assertion).
            </p>
          </div>

          {activePillarTab !== 'all' && (
            <button
              onClick={() => setActivePillarTab('all')}
              className="text-xs text-[#B99A62] hover:underline font-semibold"
            >
              Clear Filter (Show All)
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredFindings.map((f: EvidenceFinding) => {
            const isExpanded = expandedCardId === f.id;
            const isCrit = f.severity === 'critical';
            const isCaut = f.severity === 'caution';

            return (
              <div 
                key={f.id}
                className="bg-white rounded-lg border border-[#E7E5DF] shadow-xs overflow-hidden transition-all"
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedCardId(isExpanded ? null : f.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F6F2] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      {isCrit ? (
                        <div className="w-7 h-7 rounded-md bg-[#FEF2F2] text-[#B91C1C] flex items-center justify-center font-bold text-xs">
                          !
                        </div>
                      ) : isCaut ? (
                        <div className="w-7 h-7 rounded-md bg-[#FFFBEB] text-[#B45309] flex items-center justify-center font-bold text-xs">
                          ?
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-md bg-[#F0FDF4] text-[#15803D] flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#69717D] mb-1 flex-wrap">
                        <span className="uppercase font-semibold text-[#172C4D]">{f.category}</span>
                        <span>·</span>
                        {renderProvenanceBadge(f.provenance)}
                      </div>
                      <div className="text-xs font-bold text-[#171A1F] truncate">
                        {f.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-[#69717D] hidden sm:inline">
                      {f.verifiedThroughOfficialChannel ? 'Verified Against Statute/Registry' : 'Discrepancy Flagged'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#69717D]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#69717D]" />
                    )}
                  </div>
                </div>

                {/* Expanded Card Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E7E5DF] text-xs space-y-3 bg-[#FAF8F5]">
                    <p className="text-[#48505E] leading-relaxed">
                      {f.description}
                    </p>

                    {f.excerpt && (
                      <div className="p-3 bg-white border border-[#E7E5DF] rounded-md font-mono text-[11px] text-[#171A1F]">
                        <div className="text-[10px] text-[#69717D] uppercase font-sans mb-1 font-semibold flex items-center justify-between">
                          <span>Extracted Notice Snippet</span>
                          <span className="text-[10px] font-mono text-[#868E96]">OCR Layer</span>
                        </div>
                        {f.excerpt}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-white rounded-md border border-[#E7E5DF]">
                        <div className="text-[10px] text-[#69717D] uppercase font-semibold mb-1">
                          Why This Finding Matters
                        </div>
                        <p className="text-[#171A1F] text-[11px] leading-relaxed">
                          {f.whyItMatters}
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-md border border-[#E7E5DF]">
                        <div className="text-[10px] text-[#69717D] uppercase font-semibold mb-1">
                          Recommended Verification Action
                        </div>
                        <p className="text-[#172C4D] font-medium text-[11px] leading-relaxed">
                          {f.recommendedAction}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Fuzzy Matching & Data Mining Demonstration */}
      <div className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172C4D] uppercase tracking-wide">
            <Layers className="w-4 h-4 text-[#B99A62]" />
            <span>Multi-Signal Similarity &amp; Reference Mining</span>
          </div>
          <h3 className="text-base font-bold text-[#171A1F] mt-1">
            Institutional Reference Corpus Diff
          </h3>
          <p className="text-xs text-[#69717D] leading-relaxed">
            Extracted attributes are normalized and compared against official institutional profiles using Levenshtein distance and token n-grams.
            <strong className="text-[#171A1F]"> Similarity does not equal authenticity</strong>—fraudulent documents often copy legitimate templates with minor altered routing.
          </p>
        </div>

        {assessment.fuzzyMatches.length === 0 ? (
          <div className="p-4 bg-[#F7F6F2] rounded-md text-xs text-[#69717D] text-center">
            No near-match discrepancies flagged against canonical reference datasets.
          </div>
        ) : (
          <div className="divide-y divide-[#E7E5DF] border border-[#E7E5DF] rounded-lg overflow-hidden text-xs">
            {assessment.fuzzyMatches.map((m, idx) => (
              <div key={idx} className="p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[#171A1F] flex items-center gap-2">
                    <span className="text-[#172C4D]">{m.fieldName}</span>
                    <span className="text-[10px] text-[#B91C1C] bg-[#FEF2F2] px-1.5 py-0.2 rounded-xs font-mono">
                      {m.flagType.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="font-mono text-[#B99A62] font-bold">
                    {m.similarityPercentage}% Similarity
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-md text-[#7F1D1D]">
                    <div className="text-[10px] font-sans font-semibold text-[#B91C1C] mb-0.5">Extracted from Notice:</div>
                    <div className="truncate">{m.extractedValue}</div>
                  </div>
                  <div className="p-2.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-md text-[#14532D]">
                    <div className="text-[10px] font-sans font-semibold text-[#15803D] mb-0.5">Official Whitelisted Pattern:</div>
                    <div className="truncate">{m.referenceValue}</div>
                  </div>
                </div>

                <div className="text-[11px] text-[#48505E] pt-1">
                  <strong>Variance:</strong> {m.differenceSummary} · <span className="text-[#69717D]">{m.whyMatchMatters}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. Assessment Summary & Action Buttons */}
      <div className="p-6 bg-[#172C4D] text-[#F7F6F2] rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#B99A62] font-semibold uppercase tracking-wider">
            Recommended Next Step
          </div>
          <div className="text-sm font-bold mt-0.5">
            {isSuspicious
              ? 'Verify DIN directly on the official portal before making any contact or payment'
              : 'Proceed to Notice Analysis to review plain-language translation and response actions'}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={selectedNotice.issuingAuthority.dinVerificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-white text-[#172C4D] hover:bg-[#F7F6F2] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Verify on Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onNavigateToAnalysis}
            className="px-4 py-2 bg-[#B99A62] hover:bg-[#A38652] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Continue to Notice Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 8. Email Forwarding Workflow Modal */}
      {emailForwardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E7E5DF] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-3">
              <h3 className="text-sm font-bold text-[#171A1F] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#172C4D]" />
                <span>Forward Notices to Your Vault</span>
              </h3>
              <button
                onClick={() => setEmailForwardModal(false)}
                className="text-[#69717D] hover:text-[#171A1F] text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#48505E] leading-relaxed">
              Founders and accounting teams can automatically ingest notices by forwarding tax or government emails directly to their secure company vault.
            </p>

            <div className="p-3 bg-[#F7F6F2] border border-[#E7E5DF] rounded-md space-y-1">
              <div className="text-[10px] text-[#69717D] uppercase font-semibold">Your Dedicated Intake Address:</div>
              <div className="flex items-center justify-between font-mono text-xs text-[#172C4D] font-bold">
                <span>notices-apex@vault.lexora.in</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('notices-apex@vault.lexora.in');
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="px-2 py-0.5 bg-white border border-[#E7E5DF] rounded text-[10px] font-sans font-medium text-[#171A1F] hover:bg-[#EBE8E0]"
                >
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-[#69717D] space-y-1">
              <div>✓ Documents are parsed through DIN &amp; structural anomaly checks upon ingestion.</div>
              <div>✓ Urgent deadline alerts are synchronized with your registered director phone.</div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setEmailForwardModal(false)}
                className="w-full py-2 bg-[#172C4D] text-white text-xs font-semibold rounded-md hover:bg-[#112038]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
