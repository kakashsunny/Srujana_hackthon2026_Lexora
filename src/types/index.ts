export type AuthorityType = 'gst' | 'income_tax' | 'labour' | 'legal_court' | 'corporate_mca';

export type AuthenticityOutcome = 'no_red_flags' | 'suspicious' | 'unable_to_verify';

export function getAuthenticityLabel(outcome: AuthenticityOutcome): 'Appears Genuine' | 'Suspicious' | 'Requires Direct Verification' {
  switch (outcome) {
    case 'suspicious':
      return 'Suspicious';
    case 'unable_to_verify':
      return 'Requires Direct Verification';
    case 'no_red_flags':
    default:
      return 'Appears Genuine';
  }
}

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

export type NoticeStatus = 'received' | 'analyzed' | 'in_review' | 'response_drafted' | 'submitted' | 'resolved';

export interface IssuingAuthority {
  name: string;
  department: string;
  officialDomain: string;
  portalUrl: string;
  helpline: string;
  dinVerificationUrl: string;
  standardReferenceFormat: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'mr' | 'bn' | 'gu';

export type EvidenceProvenance = 'verified_fact' | 'ai_finding' | 'unverified';

export interface EvidenceFinding {
  id: string;
  category: 'sender' | 'identifier' | 'similarity' | 'consistency' | 'payment';
  title: string;
  description: string;
  excerpt?: string;
  whyItMatters: string;
  severity: 'info' | 'caution' | 'critical';
  verifiedThroughOfficialChannel: boolean;
  provenance: EvidenceProvenance; // Distinguish verified facts vs AI findings vs unverified
  dataMiningSource?: string;
  recommendedAction: string;
}

export interface ReferenceMatch {
  fieldName: string;
  extractedValue: string;
  referenceValue: string;
  similarityPercentage: number;
  differenceSummary: string;
  whyMatchMatters: string;
  flagType: 'benign' | 'lookalike_warning' | 'format_mismatch';
}

export interface RiskBreakdown {
  senderScore: number;       // 0-100 (100 = critical alert)
  identifierScore: number;   // 0-100
  consistencyScore: number;  // 0-100
  paymentScore: number;      // 0-100
  coercionScore: number;     // 0-100
  compositeRiskScore: number; // 0-100
  riskLevel: 'critical_risk' | 'moderate_risk' | 'low_risk' | 'indeterminate';
}

export interface AuthenticityAssessment {
  outcome: AuthenticityOutcome;
  confidenceScore: number; // 0-100 coverage
  riskScore: number; // 0-100 explainable risk
  riskBreakdown: RiskBreakdown;
  checksCompleted: string[];
  checksNotCompleted: string[];
  limitations: string[];
  findings: EvidenceFinding[];
  fuzzyMatches: ReferenceMatch[];
  assessmentDate: string;
  statutoryDisclaimer: string;
}

export interface GlossaryItem {
  term: string;
  originalTerm: string;
  simpleExplanation: string;
  statuteReference?: string;
}

export interface NoticeTranslation {
  language: SupportedLanguage;
  languageLabel: string;
  title: string;
  plainSummary: string;
  whyReceived: string;
  actionItems: string[];
  legalExplanation: string;
  urgencyNote: string;
  glossary: GlossaryItem[];
}

export interface DetectedLanguageInfo {
  primaryLanguage: SupportedLanguage;
  languageName: string;
  confidence: number; // 0-100
  detectedScripts: string[];
  isBilingual: boolean;
  details: string;
}

export interface ActionItem {
  id: string;
  text: string;
  deadlineOffsetDays: number;
  completed: boolean;
  roleHint: string;
}

export interface LegalCitation {
  act: string;
  section: string;
  ruleOrSubSection?: string;
  plainMeaning: string;
  extractedSnippet: string;
  isStatutoryRequirement: boolean;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
  isCollected: boolean;
}

export interface Notice {
  id: string;
  referenceNumber: string;
  din?: string;
  title: string;
  category: AuthorityType;
  issuingAuthority: IssuingAuthority;
  senderEmail: string;
  recipientName: string;
  recipientGstinOrPan: string;
  dateIssued: string;
  dateReceived: string;
  responseDeadline: string;
  isDeadlineInferred: boolean;
  deadlineCalculationBasis: string;
  priority: PriorityLevel;
  status: NoticeStatus;
  demandAmountInr?: number;
  
  // Intelligence Content
  plainSummary: string;
  kannadaSummary?: string;
  whyReceived: string;
  actionItems: ActionItem[];
  legalCitations: LegalCitation[];
  requiredDocuments: RequiredDocument[];
  
  // Professional Recommendation
  recommendedProfessional: 'Chartered Accountant (Tax)' | 'High Court Advocate' | 'Labour Law Consultant' | 'Company Secretary' | 'Self-Handled';
  professionalReason: string;
  consultationQuestions: string[];
  
  // Authenticity & Risk
  authenticity: AuthenticityAssessment;
  
  // Multilingual Intelligence
  detectedLanguage?: DetectedLanguageInfo;
  translations?: Partial<Record<SupportedLanguage, NoticeTranslation>>;
  
  // Mock Document Artifacts
  documentPages: string[];
  extractedOcrText: string;
  documentType: 'pdf' | 'scan_jpg' | 'letter';
}

export interface ResponseDraft {
  noticeId: string;
  recipientOffice: string;
  subjectLine: string;
  referenceLine: string;
  preliminaryObjections: string;
  factualBackground: string;
  pointByPointRebuttal: string[];
  prayerOrRelief: string;
  enclosureList: string[];
  signatoryName: string;
  signatoryDesignation: string;
  lastUpdated: string;
  reviewedByProfessional: boolean;
}

export interface ProfessionalAdvisor {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  city: string;
  experienceYears: number;
  barOrIcaId: string;
  badge: string;
}
