import { Notice } from '../types';
import { runForensicAudit } from '../services/forensicEngine';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-gst-scam-01',
    title: 'Show Cause Notice under Section 73 (Alleged ITC Mismatch)',
    referenceNumber: 'DRC-01/GST/WZ/2026/8941',
    din: '202609CBIC89X004', // 16 characters (invalid format)
    category: 'gst',
    issuingAuthority: {
      name: 'Superintendent, Central GST Division-IV, New Delhi',
      department: 'Central Board of Indirect Taxes and Customs',
      officialDomain: 'cbic.gov.in',
      portalUrl: 'https://services.gst.gov.in',
      helpline: '1800-103-4786',
      dinVerificationUrl: 'https://www.cbic.gov.in/htdocs-cbec/din-search',
      standardReferenceFormat: '20-character alphanumeric DIN'
    },
    senderEmail: 'recovery-officer@cbic-gov-portal.org',
    recipientName: 'Apex Precision Tools Private Limited',
    recipientGstinOrPan: '07AAACA4912K1Z8',
    dateIssued: '2026-10-19',
    dateReceived: '2026-10-21',
    responseDeadline: '2026-10-26', // Fake urgent deadline of 5 days
    isDeadlineInferred: false,
    deadlineCalculationBasis: 'Shortened 5-day threat timeline asserted in document body (contrary to 30-day statutory default under Section 73)',
    priority: 'urgent',
    status: 'received',
    demandAmountInr: 342500,
    plainSummary: 'This document claims that your company claimed excess Input Tax Credit (ITC) of ₹3,42,500 under GSTR-3B compared to GSTR-2B for FY 2024-25. It demands immediate settlement under threat of bank account attachment within 5 days.',
    kannadaSummary: 'ಈ ದಾಖಲೆಯು ನಿಮ್ಮ ಸಂಸ್ಥೆಯು 2024-25ನೇ ಸಾಲಿನ GSTR-3B ನಲ್ಲಿ ₹3,42,500 ರಷ್ಟು ಹೆಚ್ಚುವರಿ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ ಪಡೆದಿದೆ ಎಂದು ಆರೋಪಿಸುತ್ತದೆ ಮತ್ತು 5 ದಿನಗಳಲ್ಲಿ ಪಾವತಿಸಲು ಬೆದರಿಕೆ ಹಾಕುತ್ತದೆ.',
    whyReceived: 'Claims an alleged discrepancy between purchases reported by suppliers in GSTR-1 and tax credits claimed in GSTR-3B return.',
    actionItems: [
      {
        id: 'act-1',
        text: 'DO NOT pay via the UPI handle or QR code in the notice. No legitimate tax is payable to private UPI accounts.',
        deadlineOffsetDays: 0,
        completed: false,
        roleHint: 'Safety Rule'
      },
      {
        id: 'act-2',
        text: 'Perform DIN verification on official CBIC search portal (cbic.gov.in/din).',
        deadlineOffsetDays: 1,
        completed: false,
        roleHint: 'Verification'
      },
      {
        id: 'act-3',
        text: 'Log into the genuine GST portal (services.gst.gov.in) -> Services -> User Services -> View Additional Notices/Orders to check if DRC-01 actually exists.',
        deadlineOffsetDays: 1,
        completed: false,
        roleHint: 'Portal Check'
      },
      {
        id: 'act-4',
        text: 'Share document with your retained GST Chartered Accountant for verification.',
        deadlineOffsetDays: 2,
        completed: false,
        roleHint: 'CA Review'
      }
    ],
    legalCitations: [
      {
        act: 'Central Goods and Services Tax Act, 2017',
        section: 'Section 73(1)',
        ruleOrSubSection: 'Rule 142(1)(a)',
        plainMeaning: 'Determination of tax not paid or short paid or erroneous refund or input tax credit wrongly availed for any reason other than fraud or willful misstatement.',
        extractedSnippet: 'Notice is hereby issued under Section 73(1) of the CGST Act, 2017 to show cause why tax amount of INR 3,42,500 should not be demanded.',
        isStatutoryRequirement: true
      },
      {
        act: 'CBIC Circular No. 122/41/2019-GST',
        section: 'Mandatory DIN Mandate',
        plainMeaning: 'Every CBIC communication without a computer-generated 20-digit alphanumeric DIN is non-est in the eyes of law.',
        extractedSnippet: 'Document Identification Number (DIN): 202609CBIC89X004',
        isStatutoryRequirement: true
      }
    ],
    requiredDocuments: [
      {
        id: 'doc-1',
        name: 'GSTR-2B vs GSTR-3B Reconciliation Statement (FY 24-25)',
        description: 'Excel breakdown showing supplier-wise invoice matching.',
        isMandatory: true,
        isCollected: true
      },
      {
        id: 'doc-2',
        name: 'Vendor Tax Invoices for Questioned Credits',
        description: 'Copies of purchase bills from questioning suppliers.',
        isMandatory: true,
        isCollected: false
      },
      {
        id: 'doc-3',
        name: 'Bank Statements evidencing payment to suppliers within 180 days',
        description: 'Proof that consideration was settled to vendor.',
        isMandatory: false,
        isCollected: false
      }
    ],
    recommendedProfessional: 'Chartered Accountant (Tax)',
    professionalReason: 'Suspected fraudulent notice mimicking GST DRC-01. A tax CA should verify your actual portal dashboard before any communication is dispatched.',
    consultationQuestions: [
      'Does Form DRC-01 reflect on our authenticated GST portal dashboard under "Additional Notices"?',
      'Is the DIN valid on cbic.gov.in/din?',
      'If fake, should we report this impersonation to the GST Cyber Fraud Cell?'
    ],
    authenticity: runForensicAudit(
      `GOVERNMENT OF INDIA - MINISTRY OF FINANCE
DEPARTMENT OF REVENUE - CENTRAL GST COMMISSIONERATE
DIVISION-IV, C.R. BUILDING, I.P. ESTATE, NEW DELHI - 110002

FORM GST DRC-01 [See Rule 142(1)]
SUMMARY OF SHOW CAUSE NOTICE

Reference No: DRC-01/GST/WZ/2026/8941
Document Identification Number (DIN): 202609CBIC89X004
Date of Issue: 19th October 2026

To:
M/s Apex Precision Tools Private Limited
GSTIN: 07AAACA4912K1Z8
Okhla Industrial Area Phase-III, New Delhi - 110020

SUB: NOTICE UNDER SECTION 73(1) OF CGST ACT, 2017 - IRREGULAR AVAILMENT OF INPUT TAX CREDIT FOR FINANCIAL YEAR 2024-25

1. Whereas on scrutiny of returns filed in Form GSTR-3B vis-a-vis auto-populated Form GSTR-2B, an excess credit of INR 3,42,500 has been availed without invoice reflection.
2. You are hereby required to deposit the said amount along with statutory interest within 5 days of receipt of this notice.
3. Failure to comply will lead to immediate freezing of bank accounts and asset attachment under Section 79.
4. For expedited clearance, scan the settlement QR code below or transfer penalty directly to settlement UPI: gstin.recovery.dept@okaxis.

(R. K. Malhotra)
Superintendent of Central Tax
Dispatched from: recovery-officer@cbic-gov-portal.org`,
      {
        authorityKey: 'cbic_gst',
        senderEmail: 'recovery-officer@cbic-gov-portal.org',
        din: '202609CBIC89X004',
        referenceNumber: 'DRC-01/GST/WZ/2026/8941'
      }
    ),
    documentPages: [
      'Page 1: Official Header, Recipient GSTIN, Table of Alleged ITC Shortfall, Payment QR Code & Threat Clause.'
    ],
    extractedOcrText: `GOVERNMENT OF INDIA - MINISTRY OF FINANCE
DEPARTMENT OF REVENUE - CENTRAL GST COMMISSIONERATE
DIVISION-IV, C.R. BUILDING, I.P. ESTATE, NEW DELHI - 110002

FORM GST DRC-01 [See Rule 142(1)]
SUMMARY OF SHOW CAUSE NOTICE

Reference No: DRC-01/GST/WZ/2026/8941
Document Identification Number (DIN): 202609CBIC89X004
Date of Issue: 19th October 2026

To:
M/s Apex Precision Tools Private Limited
GSTIN: 07AAACA4912K1Z8
Okhla Industrial Area Phase-III, New Delhi - 110020

SUB: NOTICE UNDER SECTION 73(1) OF CGST ACT, 2017 - IRREGULAR AVAILMENT OF INPUT TAX CREDIT FOR FINANCIAL YEAR 2024-25

1. Whereas on scrutiny of returns filed in Form GSTR-3B vis-a-vis auto-populated Form GSTR-2B, an excess credit of INR 3,42,500 has been availed without invoice reflection.
2. You are hereby required to deposit the said amount along with statutory interest within 5 days of receipt of this notice.
3. Failure to comply will lead to immediate freezing of bank accounts and asset attachment under Section 79.
4. For expedited clearance, scan the settlement QR code below or transfer penalty directly to settlement UPI: gstin.recovery.dept@okaxis.

(R. K. Malhotra)
Superintendent of Central Tax
Dispatched from: recovery-officer@cbic-gov-portal.org`,
    documentType: 'pdf'
  },
  {
    id: 'notice-it-scrutiny-02',
    title: 'Income Tax Scrutiny Notice under Section 143(2) (AY 2025-26)',
    referenceNumber: 'ITBA/AST/S/143(2)/2026-27/1049281920',
    din: 'ITBA/AST/S/143(2)/2026-27/1049281920',
    category: 'income_tax',
    issuingAuthority: {
      name: 'Assessment Unit, National Faceless Assessment Centre (NeAC)',
      department: 'Income Tax Department (CBDT)',
      officialDomain: 'incometax.gov.in',
      portalUrl: 'https://www.incometax.gov.in',
      helpline: '1800-180-1961',
      dinVerificationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyDin',
      standardReferenceFormat: 'ITBA computer-generated DIN'
    },
    senderEmail: 'donotreply@incometax.gov.in',
    recipientName: 'Apex Precision Tools Private Limited',
    recipientGstinOrPan: 'AAACA4912K',
    dateIssued: '2026-10-15',
    dateReceived: '2026-10-16',
    responseDeadline: '2026-11-15', // Statutory 30 days
    isDeadlineInferred: false,
    deadlineCalculationBasis: '30 days from date of electronic service as per Section 143(2) of the Income Tax Act, 1961',
    priority: 'high',
    status: 'analyzed',
    plainSummary: 'Your ITR-6 return for Assessment Year 2025-26 has been selected for Complete Scrutiny under the Faceless Assessment Scheme. You are required to submit explanations regarding substantial cash deposits and gross turnover discrepancy against Form 26AS.',
    kannadaSummary: 'ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ವರ್ಷ 2025-26 ರ ಆದಾಯ ತೆರಿಗೆ ರಿಟರ್ನ್ ಅನ್ನು ಸಂಪೂರ್ಣ ಪರಿಶೀಲನೆಗಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ. 30 ದಿನಗಳೊಳಗೆ ವಿವರಣೆ ನೀಡಬೇಕು.',
    whyReceived: 'Discrepancy identified between gross turnover reported in audited Profit & Loss (₹4.2 Cr) vs turnover reflected in Annual Information Statement (AIS) and Form 26AS (₹4.85 Cr).',
    actionItems: [
      {
        id: 'it-1',
        text: 'Download AIS and Form 26AS for FY 2024-25 from incometax.gov.in portal.',
        deadlineOffsetDays: 3,
        completed: true,
        roleHint: 'Portal Retrieval'
      },
      {
        id: 'it-2',
        text: 'Prepare 3-way reconciliation between Book Turnover, GSTR-9 turnover, and Form 26AS.',
        deadlineOffsetDays: 10,
        completed: false,
        roleHint: 'Accounting Team'
      },
      {
        id: 'it-3',
        text: 'Draft written submission with annexures for filing through e-Proceedings tab on portal.',
        deadlineOffsetDays: 20,
        completed: false,
        roleHint: 'Tax CA'
      }
    ],
    legalCitations: [
      {
        act: 'Income Tax Act, 1961',
        section: 'Section 143(2)',
        ruleOrSubSection: 'Clause (i)',
        plainMeaning: 'Notice issued when Assessing Officer considers it necessary to verify whether claims of deductions, expenses, and turnover in return are correct and complete.',
        extractedSnippet: 'This is to inform you that the return of income filed by you has been selected for Complete Scrutiny under CASS.',
        isStatutoryRequirement: true
      },
      {
        act: 'Income Tax Act, 1961',
        section: 'Section 144B',
        plainMeaning: 'Mandatory Faceless Assessment procedure. All submissions must be uploaded through the online e-filing portal; no physical appearance is permitted.',
        extractedSnippet: 'Submissions to be made strictly through the e-Filing portal under "e-Proceedings".',
        isStatutoryRequirement: true
      }
    ],
    requiredDocuments: [
      {
        id: 'itdoc-1',
        name: 'Audited Balance Sheet, P&L Account, and Tax Audit Report (Form 3CA-3CD)',
        description: 'Complete audited financials signed by Statutory Auditor.',
        isMandatory: true,
        isCollected: true
      },
      {
        id: 'itdoc-2',
        name: 'Turnover Reconciliation Statement (P&L vs AIS vs 26AS)',
        description: 'Detailed explanation for the ₹65 Lakh variance.',
        isMandatory: true,
        isCollected: false
      },
      {
        id: 'itdoc-3',
        name: 'Bank Statement Analysis for Main Operational Accounts',
        description: 'Itemized bank statement entries matching turnover credit notes.',
        isMandatory: true,
        isCollected: false
      }
    ],
    recommendedProfessional: 'Chartered Accountant (Tax)',
    professionalReason: 'Scrutiny under Section 143(2) requires formal reconciliation, legal submissions on e-proceedings portal, and tax audit alignment.',
    consultationQuestions: [
      'What caused the ₹65 Lakh gap between our audited books and Form 26AS/AIS?',
      'Are there client advances or GST components that require special scheduling?',
      'Can we file an interim response requesting an adjournment of 15 days if reconciliation takes time?'
    ],
    authenticity: runForensicAudit(
      `INCOME TAX DEPARTMENT - GOVT OF INDIA
NATIONAL FACELESS ASSESSMENT CENTRE, NEW DELHI

NOTICE UNDER SECTION 143(2) OF THE INCOME-TAX ACT, 1961

DIN: ITBA/AST/S/143(2)/2026-27/1049281920
Date: 15-Oct-2026

PAN: AAACA4912K
Assessment Year: 2025-26

To:
Apex Precision Tools Private Limited
Okhla Industrial Area Phase-III, New Delhi

Sir/Madam,
1. This is to inform you that the return of income for Assessment Year 2025-26 filed by you has been selected for Complete Scrutiny under Computer Assisted Scrutiny System (CASS).
2. The specific issues identified for scrutiny are:
   (i) Mismatch in Turnover reported in Audit Report vis-a-vis Gross Receipts in Form 26AS/AIS.
   (ii) Large cash deposits during the financial year.
3. You are requested to submit the relevant documents and explanation online through your e-filing account at www.incometax.gov.in under "e-Proceedings" by 15-Nov-2026.
4. No personal appearance before the Assessing Officer is permitted or required under Section 144B.

Income Tax Officer
Ward 3(1), NeAC, New Delhi
Email: donotreply@incometax.gov.in`,
      {
        authorityKey: 'cbdt_incometax',
        senderEmail: 'donotreply@incometax.gov.in',
        din: 'ITBA/AST/S/143(2)/2026-27/1049281920',
        referenceNumber: 'ITBA/AST/S/143(2)/2026-27/1049281920'
      }
    ),
    documentPages: [
      'Page 1: CBDT Emblem, DIN, PAN, Scrutiny Reasons (Turnover Mismatch & Cash Deposits), 30-Day Response Window.'
    ],
    extractedOcrText: `INCOME TAX DEPARTMENT - GOVT OF INDIA
NATIONAL FACELESS ASSESSMENT CENTRE, NEW DELHI

NOTICE UNDER SECTION 143(2) OF THE INCOME-TAX ACT, 1961

DIN: ITBA/AST/S/143(2)/2026-27/1049281920
Date: 15-Oct-2026

PAN: AAACA4912K
Assessment Year: 2025-26

To:
Apex Precision Tools Private Limited
Okhla Industrial Area Phase-III, New Delhi

Sir/Madam,
1. This is to inform you that the return of income for Assessment Year 2025-26 filed by you has been selected for Complete Scrutiny under Computer Assisted Scrutiny System (CASS).
2. The specific issues identified for scrutiny are:
   (i) Mismatch in Turnover reported in Audit Report vis-a-vis Gross Receipts in Form 26AS/AIS.
   (ii) Large cash deposits during the financial year.
3. You are requested to submit the relevant documents and explanation online through your e-filing account at www.incometax.gov.in under "e-Proceedings" by 15-Nov-2026.
4. No personal appearance before the Assessing Officer is permitted or required under Section 144B.

Income Tax Officer
Ward 3(1), NeAC, New Delhi
Email: donotreply@incometax.gov.in`,
    documentType: 'pdf'
  },
  {
    id: 'notice-epfo-inquiry-03',
    title: 'EPFO Section 7A Summon for Assessment of PF Dues (Contract Workers)',
    referenceNumber: 'RO/BNG/ENF/7A/2026/0912',
    category: 'labour',
    issuingAuthority: {
      name: 'Regional P.F. Commissioner-II, Bangalore Regional Office',
      department: 'Employees Provident Fund Organisation',
      officialDomain: 'epfindia.gov.in',
      portalUrl: 'https://unifiedportal-epfo.epfindia.gov.in',
      helpline: '1800-118-005',
      dinVerificationUrl: 'https://epfindia.gov.in',
      standardReferenceFormat: 'RO Code + Establishment Code + Section'
    },
    senderEmail: 'ro.bangalore@epfindia.gov.in',
    recipientName: 'Apex Precision Tools Private Limited (Bangalore Depot)',
    recipientGstinOrPan: 'KN/BNG/0049182/000',
    dateIssued: '2026-10-10',
    dateReceived: '2026-10-14',
    responseDeadline: '2026-11-04',
    isDeadlineInferred: false,
    deadlineCalculationBasis: 'Hearing date explicitly fixed for personal/representative attendance on 4th November 2026 at 11:30 AM',
    priority: 'high',
    status: 'in_review',
    demandAmountInr: 185000,
    plainSummary: 'Summons under Section 7A of the EPF & MP Act, 1952 regarding alleged non-remittance of provident fund contributions for 14 security and housekeeping contractors during FY 2023-24.',
    kannadaSummary: 'ಇಪಿಎಫ್ ಕಾಯಿದೆ ಸೆಕ್ಷನ್ 7A ಅಡಿಯಲ್ಲಿ 14 ಗುತ್ತಿಗೆ ನೌಕರರ ಭವಿಷ್ಯ ನಿಧಿ ಬಾಕಿ ವಿಚಾರಣೆಗಾಗಿ ಹಾಜರಾಗಲು ಸಮನ್ಸ್ ನೀಡಲಾಗಿದೆ.',
    whyReceived: 'Inspection report by Enforcement Officer alleged that contract personnel engaged on shop floor were excluded from the Electronic Challan cum Return (ECR).',
    actionItems: [
      {
        id: 'epf-1',
        text: 'Retrieve contracts and monthly invoices with Security & Housekeeping agency.',
        deadlineOffsetDays: 3,
        completed: true,
        roleHint: 'HR & Admin'
      },
      {
        id: 'epf-2',
        text: 'Collect contractor ECR contribution receipts and proof of direct UAN deposits by vendor.',
        deadlineOffsetDays: 7,
        completed: false,
        roleHint: 'Contractor Audit'
      },
      {
        id: 'epf-3',
        text: 'Prepare Authorization Letter for Labour Consultant/Advocate to represent company at hearing.',
        deadlineOffsetDays: 12,
        completed: false,
        roleHint: 'Management'
      }
    ],
    legalCitations: [
      {
        act: 'Employees Provident Funds and Miscellaneous Provisions Act, 1952',
        section: 'Section 7A',
        plainMeaning: 'Empowers the Commissioner to conduct quasi-judicial inquiry to determine dues and decide disputes regarding applicability of the Act.',
        extractedSnippet: 'Whereas an inquiry under Section 7A is instituted to determine amount due from the establishment.',
        isStatutoryRequirement: true
      },
      {
        act: 'EPF Act, 1952',
        section: 'Section 8A',
        plainMeaning: 'Principal Employer liability: The principal employer may recover PF dues paid on behalf of contractor from contractor bills, provided proper documentation is maintained.',
        extractedSnippet: 'Principal employer responsibility under Section 8A for contractual staff.',
        isStatutoryRequirement: true
      }
    ],
    requiredDocuments: [
      {
        id: 'epfdoc-1',
        name: 'Master Service Agreement with Contractor Agencies',
        description: 'Vendor agreement showing PF compliance indemnification clause.',
        isMandatory: true,
        isCollected: true
      },
      {
        id: 'epfdoc-2',
        name: 'Contractor TRRN (Challan) and ECR sheets for FY 23-24',
        description: 'Bank confirmation of PF remittances by contractor.',
        isMandatory: true,
        isCollected: false
      },
      {
        id: 'epfdoc-3',
        name: 'Attendance register and Wage slips for questioned workers',
        description: 'Verified muster rolls of the facility.',
        isMandatory: true,
        isCollected: false
      }
    ],
    recommendedProfessional: 'Labour Law Consultant',
    professionalReason: 'Quasi-judicial hearing before Regional PF Commissioner requires specialized labour law representation and contractor liability defense.',
    consultationQuestions: [
      'Can we prove the contractor has an independent PF establishment code KN/BNG/99812?',
      'If the contractor defaulted, does Apex have immediate secondary liability under Section 8A?',
      'What indemnity or withholding can we exercise against the contractor pending hearing?'
    ],
    authenticity: runForensicAudit(
      `EMPLOYEES PROVIDENT FUND ORGANISATION
REGIONAL OFFICE: RAJARAJESHWARI NAGAR, BENGALURU - 560098

NOTICE / SUMMONS UNDER SECTION 7A OF EPF & MP ACT, 1952

Ref No: RO/BNG/ENF/7A/2026/0912
Date: 10-10-2026

Establishment Code: KN/BNG/0049182/000
Establishment: M/s Apex Precision Tools Private Limited

To:
The Managing Director / Occupier

WHEREAS an inquiry under Section 7A of the Employees Provident Funds & Miscellaneous Provisions Act, 1952 has been initiated to assess and determine the provident fund dues payable in respect of 14 contractual employees for the period 04/2023 to 03/2024.

YOU ARE HEREBY SUMMONED to appear before the undersigned in person or through an authorized representative on 04-11-2026 at 11:30 AM with original attendance registers, wage registers, and contractor PF payment challans.

Please note that failure to appear will result in ex-parte determination and recovery proceedings under Section 8.

Regional P.F. Commissioner-II
Bengaluru
Email: ro.bangalore@epfindia.gov.in`,
      {
        authorityKey: 'epfo_labour',
        senderEmail: 'ro.bangalore@epfindia.gov.in',
        referenceNumber: 'RO/BNG/ENF/7A/2026/0912'
      }
    ),
    documentPages: [
      'Page 1: Official EPFO Header, Summons under Section 7A, Establishment Code, Fixed Hearing Date (04-Nov-2026).'
    ],
    extractedOcrText: `EMPLOYEES PROVIDENT FUND ORGANISATION
REGIONAL OFFICE: RAJARAJESHWARI NAGAR, BENGALURU - 560098

NOTICE / SUMMONS UNDER SECTION 7A OF EPF & MP ACT, 1952

Ref No: RO/BNG/ENF/7A/2026/0912
Date: 10-10-2026

Establishment Code: KN/BNG/0049182/000
Establishment: M/s Apex Precision Tools Private Limited

To:
The Managing Director / Occupier

WHEREAS an inquiry under Section 7A of the Employees Provident Funds & Miscellaneous Provisions Act, 1952 has been initiated to assess and determine the provident fund dues payable in respect of 14 contractual employees for the period 04/2023 to 03/2024.

YOU ARE HEREBY SUMMONED to appear before the undersigned in person or through an authorized representative on 04-11-2026 at 11:30 AM with original attendance registers, wage registers, and contractor PF payment challans.

Please note that failure to appear will result in ex-parte determination and recovery proceedings under Section 8.

Regional P.F. Commissioner-II
Bengaluru
Email: ro.bangalore@epfindia.gov.in`,
    documentType: 'pdf'
  },
  {
    id: 'notice-cheque-bounce-04',
    title: 'Statutory Demand Notice under Section 138 Negotiable Instruments Act',
    referenceNumber: 'ADV/SMR/NI138/2026/142',
    category: 'legal_court',
    issuingAuthority: {
      name: 'Sharma & Associates, Advocates & Legal Consultants',
      department: 'Advocate on Record / High Court of Delhi',
      officialDomain: 'delhihighcourt.nic.in',
      portalUrl: 'https://delhihighcourt.nic.in',
      helpline: '011-23386000',
      dinVerificationUrl: 'https://delhihighcourt.nic.in',
      standardReferenceFormat: 'Advocate Legal Notice Reference'
    },
    senderEmail: 'sharma.associates.legal@gmail.com',
    recipientName: 'Apex Precision Tools Private Limited & Directors',
    recipientGstinOrPan: 'AAACA4912K',
    dateIssued: '2026-10-18',
    dateReceived: '2026-10-20',
    responseDeadline: '2026-11-04', // Strict 15 days
    isDeadlineInferred: false,
    deadlineCalculationBasis: 'Statutory 15-day cure period from date of notice delivery as mandated by Section 138(c) of NI Act',
    priority: 'urgent',
    status: 'in_review',
    demandAmountInr: 485000,
    plainSummary: 'Legal demand notice issued by an advocate on behalf of raw material vendor M/s SteelCraft Industries for a dishonoured cheque of ₹4,85,000 returned with bank memo "Funds Insufficient". Demands payment within 15 days to avoid criminal complaint under Section 138.',
    kannadaSummary: 'ಬ್ಯಾಂಕ್ ಚೆಕ್ ಬೌನ್ಸ್ (₹4,85,000) ಸಂಬಂಧಿಸಿದಂತೆ ಸೆಕ್ಷನ್ 138 ರ ಅಡಿಯಲ್ಲಿ ಕಳುಹಿಸಲಾದ ಕಾನೂನು ನೋಟಿಸ್. 15 ದಿನಗಳಲ್ಲಿ ಪಾವತಿಸಲು ಸೂಚಿಸಲಾಗಿದೆ.',
    whyReceived: 'Cheque No. 492102 dated 05-10-2026 issued towards Invoice #SC-8921 was returned dishonoured by State Bank of India with endorsement "Funds Insufficient".',
    actionItems: [
      {
        id: 'ni-1',
        text: 'Verify whether cheque was genuine or issued as security/advance for goods that had quality defects.',
        deadlineOffsetDays: 1,
        completed: true,
        roleHint: 'Finance Dept'
      },
      {
        id: 'ni-2',
        text: 'If liability is valid, arrange RTGS transfer of ₹4,85,000 before 4th November to extinguish criminal cause of action.',
        deadlineOffsetDays: 5,
        completed: false,
        roleHint: 'MD / Finance'
      },
      {
        id: 'ni-3',
        text: 'If disputed due to defective materials, engage advocate immediately to dispatch formal legal reply within 15 days.',
        deadlineOffsetDays: 7,
        completed: false,
        roleHint: 'Advocate'
      }
    ],
    legalCitations: [
      {
        act: 'Negotiable Instruments Act, 1881',
        section: 'Section 138',
        ruleOrSubSection: 'Proviso (b) and (c)',
        plainMeaning: 'Dishonour of cheque for insufficiency of funds is an offence punishable with imprisonment up to 2 years, or fine up to twice the amount, provided payee gives 15 days notice to pay.',
        extractedSnippet: 'You are hereby called upon to pay the cheque amount of INR 4,85,000 within 15 days of receipt hereof.',
        isStatutoryRequirement: true
      },
      {
        act: 'Negotiable Instruments Act, 1881',
        section: 'Section 141',
        plainMeaning: 'Offences by companies: Every person who was in charge of and responsible for the conduct of business of the company at the time of the offence is deemed guilty.',
        extractedSnippet: 'Directors being in charge of day-to-day business are arrayed as co-accused.',
        isStatutoryRequirement: true
      }
    ],
    requiredDocuments: [
      {
        id: 'nidoc-1',
        name: 'Bank Return Memo and Cheque Copy',
        description: 'Original return memo from banker with reason code.',
        isMandatory: true,
        isCollected: true
      },
      {
        id: 'nidoc-2',
        name: 'Original Purchase Order and Delivery Challan for SteelCraft',
        description: 'Evidence regarding whether material supplied was accepted or rejected.',
        isMandatory: true,
        isCollected: true
      },
      {
        id: 'nidoc-3',
        name: 'Email correspondence regarding quality rejection / debit notes',
        description: 'Contemporaneous proof that debt was not legally enforceable.',
        isMandatory: false,
        isCollected: false
      }
    ],
    recommendedProfessional: 'High Court Advocate',
    professionalReason: 'Section 138 notice has criminal implications for company directors. A formal reply within 15 days establishing non-enforceable debt is essential.',
    consultationQuestions: [
      'Did we send a debit note or rejection email before the cheque was deposited by the vendor?',
      'If we settle the principal amount now, does the vendor agree to provide a No Dues Certificate?',
      'What format must the reply notice follow to protect directors under Section 141?'
    ],
    authenticity: runForensicAudit(
      `SHARMA & ASSOCIATES
ADVOCATES & LEGAL CONSULTANTS
CHAMBER NO. 412, LAWYERS CHAMBERS, DELHI HIGH COURT, NEW DELHI - 110003

REGISTERED A.D. / SPEED POST
LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

Date: 18-Oct-2026
Ref: ADV/SMR/NI138/2026/142

To:
1. M/s Apex Precision Tools Private Limited
2. Mr. Rajesh Kumar, Managing Director
3. Mrs. Sunita Kumar, Whole-time Director
Okhla Industrial Area, New Delhi

Under instructions from and on behalf of my client, M/s SteelCraft Industries, New Delhi, I hereby serve upon you this statutory legal notice:

1. That my client supplied high-tensile steel bars against Invoice #SC-8921 dated 20-08-2026 for a total sum of INR 4,85,000.
2. In discharge of your legally enforceable liability, you issued Cheque No. 492102 dated 05-10-2026 drawn on State Bank of India.
3. Upon presentation, the said cheque was returned dishonoured with the remark "Funds Insufficient" vide memo dated 14-10-2026.
4. I therefore call upon you to pay the said sum of INR 4,85,000 within 15 days of receipt of this notice, failing which criminal proceedings under Section 138 read with Section 141 of the NI Act will be instituted against you before the Court of Metropolitan Magistrate.

Yours faithfully,
(Sanjay Sharma, Advocate)
Enrolment No: D/1498/2011`,
      {
        authorityKey: 'delhi_high_court',
        senderEmail: 'sharma.associates.legal@gmail.com',
        referenceNumber: 'ADV/SMR/NI138/2026/142'
      }
    ),
    documentPages: [
      'Page 1: Advocate Letterhead, Bar Enrolment No, Client SteelCraft, Dishonoured Cheque Details (₹4,85,000), 15-Day Cure Demand.'
    ],
    extractedOcrText: `SHARMA & ASSOCIATES
ADVOCATES & LEGAL CONSULTANTS
CHAMBER NO. 412, LAWYERS CHAMBERS, DELHI HIGH COURT, NEW DELHI - 110003

REGISTERED A.D. / SPEED POST
LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

Date: 18-Oct-2026
Ref: ADV/SMR/NI138/2026/142

To:
1. M/s Apex Precision Tools Private Limited
2. Mr. Rajesh Kumar, Managing Director
3. Mrs. Sunita Kumar, Whole-time Director
Okhla Industrial Area, New Delhi

Under instructions from and on behalf of my client, M/s SteelCraft Industries, New Delhi, I hereby serve upon you this statutory legal notice:

1. That my client supplied high-tensile steel bars against Invoice #SC-8921 dated 20-08-2026 for a total sum of INR 4,85,000.
2. In discharge of your legally enforceable liability, you issued Cheque No. 492102 dated 05-10-2026 drawn on State Bank of India.
3. Upon presentation, the said cheque was returned dishonoured with the remark "Funds Insufficient" vide memo dated 14-10-2026.
4. I therefore call upon you to pay the said sum of INR 4,85,000 within 15 days of receipt of this notice, failing which criminal proceedings under Section 138 read with Section 141 of the NI Act will be instituted against you before the Court of Metropolitan Magistrate.

Yours faithfully,
(Sanjay Sharma, Advocate)
Enrolment No: D/1498/2011`,
    documentType: 'letter'
  }
];

export const MOCK_PROFESSIONALS = [
  {
    id: 'pro-1',
    name: 'CA Arvind Ramachandran, FCA, DISA',
    designation: 'Senior Partner, Ramachandran & Associates',
    specialization: 'Indirect Taxes, GST Litigation & CBIC Audits',
    city: 'New Delhi & Bengaluru',
    experienceYears: 18,
    barOrIcaId: 'ICAI M.No. 089234',
    badge: 'GST Specialist'
  },
  {
    id: 'pro-2',
    name: 'Adv. Meenakshi Sundaram',
    designation: 'Advocate on Record, High Court of Karnataka',
    specialization: 'Commercial Disputes, NI Act 138 & Corporate Arbitration',
    city: 'Bengaluru',
    experienceYears: 14,
    barOrIcaId: 'KAR/1842/2012',
    badge: 'Litigation Counsel'
  },
  {
    id: 'pro-3',
    name: 'P. V. Narayanan, FCS',
    designation: 'Managing Partner, Apex Corporate Governance Advisors',
    specialization: 'Labour Codes, EPFO/ESIC Compliance & MCA Inquiries',
    city: 'Bengaluru & Chennai',
    experienceYears: 22,
    barOrIcaId: 'ICSI FCS 4912',
    badge: 'Labour & Compliance'
  }
];
