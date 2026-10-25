import { IssuingAuthority } from '../types';

export interface AuthorityReferenceCatalog {
  canonicalName: string;
  aliases: string[];
  officialDomains: string[];
  portalUrl: string;
  dinVerificationUrl: string;
  dinFormatRegex: RegExp;
  dinFormatDescription: string;
  standardPaymentChannels: string[];
  knownImpersonationDomains: string[];
  helpline: string;
}

export const OFFICIAL_AUTHORITIES_CATALOG: Record<string, AuthorityReferenceCatalog> = {
  cbic_gst: {
    canonicalName: 'Central Board of Indirect Taxes and Customs (CBIC)',
    aliases: ['CBIC', 'GST Directorate', 'Central GST Commissionerate', 'Directorate General of GST Intelligence', 'DGGI'],
    officialDomains: ['cbic.gov.in', 'gst.gov.in', 'icegate.gov.in', 'services.gst.gov.in'],
    portalUrl: 'https://services.gst.gov.in',
    dinVerificationUrl: 'https://www.cbic.gov.in/htdocs-cbec/din-search',
    dinFormatRegex: /^(20[2-3][0-9])([0-1][0-9])([0-3][0-9])([A-Z0-9]{14})$/,
    dinFormatDescription: '20-character alphanumeric DIN issued through CBIC portal (Circular No. 122/41/2019-GST)',
    standardPaymentChannels: ['GST PMT-06 challan generated via gst.gov.in (NEFT/RTGS to RBI or authorized public sector banks)'],
    knownImpersonationDomains: ['cbic-gov-portal.org', 'gst-tax-clearance.in', 'cbic-taxnotice.com', 'gstin-settlement.co'],
    helpline: '1800-103-4786'
  },
  cbdt_incometax: {
    canonicalName: 'Income Tax Department (CBDT)',
    aliases: ['Income Tax Department', 'CBDT', 'Assessment Unit, NeAC', 'National e-Assessment Centre'],
    officialDomains: ['incometax.gov.in', 'incometaxindia.gov.in', 'tdscpc.gov.in'],
    portalUrl: 'https://www.incometax.gov.in',
    dinVerificationUrl: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyDin',
    dinFormatRegex: /^ITBA\/[A-Z0-9_\-\/]{10,30}$/,
    dinFormatDescription: 'CBDT ITBA computer-generated Notice DIN starting with ITBA/',
    standardPaymentChannels: ['e-Pay Tax Challan ITNS 280 / CRN via incometax.gov.in portal only'],
    knownImpersonationDomains: ['incometax-gov-online.com', 'itdept-refund.co.in', 'tax-appeal-portal.org'],
    helpline: '1800-180-1961'
  },
  epfo_labour: {
    canonicalName: 'Employees Provident Fund Organisation (EPFO)',
    aliases: ['EPFO', 'Regional PF Commissioner', 'Ministry of Labour and Employment'],
    officialDomains: ['epfindia.gov.in', 'unifiedportal-epfo.epfindia.gov.in'],
    portalUrl: 'https://unifiedportal-epfo.epfindia.gov.in',
    dinVerificationUrl: 'https://epfindia.gov.in/site_en/CheckEstablishment.php',
    dinFormatRegex: /^RO\/[A-Z]{3}\/[0-9]{5,10}\/[0-9]{2,4}$/,
    dinFormatDescription: 'Regional Office reference code with establishment ID and inquiry year',
    standardPaymentChannels: ['Direct internet banking via EPFO unified portal e-Sewa challan'],
    knownImpersonationDomains: ['epfo-settlement.in', 'labour-pf-claim.org'],
    helpline: '1800-118-005'
  },
  delhi_high_court: {
    canonicalName: 'High Court of Delhi',
    aliases: ['Delhi High Court', 'Honble High Court of Delhi at New Delhi'],
    officialDomains: ['delhihighcourt.nic.in', 'ecourts.gov.in'],
    portalUrl: 'https://delhihighcourt.nic.in',
    dinVerificationUrl: 'https://delhihighcourt.nic.in/case-status',
    dinFormatRegex: /^(CS|CRL|WP|ARB|CO)\s*\([A-Z]*\)\s*[0-9]+\/[0-9]{4}$/i,
    dinFormatDescription: 'Court Case filing identifier (e.g. CS(COMM) 412/2026)',
    standardPaymentChannels: ['Delhi High Court e-Court Fee portal (shcilestockholding.com / delhihighcourt.nic.in)'],
    knownImpersonationDomains: ['delhicourt-legalnotice.in', 'court-summons-india.com'],
    helpline: '011-43010101'
  },
  karnataka_commercial_taxes: {
    canonicalName: 'Commercial Taxes Department, Government of Karnataka',
    aliases: ['Karnataka Commercial Taxes', 'KGST Department', 'LGSTO Bangalore', 'Commissioner of Commercial Taxes Karnataka'],
    officialDomains: ['karnataka.gov.in', 'kar.nic.in', 'gst.kar.nic.in'],
    portalUrl: 'https://karnatakastategst.kar.nic.in',
    dinVerificationUrl: 'https://gst.kar.nic.in/din-search',
    dinFormatRegex: /^(20[2-3][0-9])([0-1][0-9])([0-3][0-9])([A-Z0-9]{12,14})$/,
    dinFormatDescription: 'Karnataka State GST 20-digit alphanumeric DIN',
    standardPaymentChannels: ['GST PMT-06 State Tax challan via gst.gov.in / Khajane-II treasury'],
    knownImpersonationDomains: ['karnataka-tax-clearance.org', 'bangalore-gst-settlement.in'],
    helpline: '080-22340500'
  }
};
