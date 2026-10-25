import { SupportedLanguage, DetectedLanguageInfo, NoticeTranslation, GlossaryItem, Notice } from '../types';

export interface SupportedLanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
];

/**
 * Universal Legal Glossaries with Simple Language Explanations
 * Preserves original statutes and citation anchors.
 */
export const LEGAL_GLOSSARY_REGISTRY: Record<string, {
  term: string;
  statuteReference: string;
  translations: Record<SupportedLanguage, { term: string; simpleExplanation: string }>;
}> = {
  show_cause: {
    term: 'Show Cause Notice (SCN)',
    statuteReference: 'Section 73/74 CGST Act, 2017 & Section 143(2) IT Act',
    translations: {
      en: {
        term: 'Show Cause Notice (SCN)',
        simpleExplanation: 'An official demand asking you to explain why tax, penalty, or disciplinary action should not be levied against your company.',
      },
      hi: {
        term: 'कारण बताओ नोटिस (Show Cause Notice)',
        simpleExplanation: 'कर विभाग या प्राधिकरण का आधिकारिक पत्र जिसमें पूछा गया है कि आपके खिलाफ कर या जुर्माना क्यों न लगाया जाए।',
      },
      kn: {
        term: 'ಕಾರಣ ಕೇಳಿ ನೋಟಿಸ್ (Show Cause Notice)',
        simpleExplanation: 'ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ಮೇಲೆ ತೆರಿಗೆ ಅಥವಾ ದಂಡವನ್ನು ಏಕೆ ವಿಧಿಸಬಾರದು ಎಂದು ವಿವರಣೆ ನೀಡಲು ಅಧಿಕಾರಿಗಳು ನೀಡುವ ಅಧಿಕೃತ ಆದೇಶ.',
      },
      ta: {
        term: 'காரணம் கேட்கும் நோட்டீஸ் (Show Cause Notice)',
        simpleExplanation: 'உங்கள் நிறுவனத்தின் மீது வரி அல்லது அபராதம் ஏன் விதிக்கப்படக்கூடாது என்பதற்கான காரணத்தை விளக்குமாறு கேட்கும் அதிகாரப்பூர்வ அறிவிப்பு.',
      },
      te: {
        term: 'కారణం తెలపాలని నోటీసు (Show Cause Notice)',
        simpleExplanation: 'మీ వ్యాపారంపై పన్ను లేదా పెనాల్టీ ఎందుకు విధించకూడదో వివరణ కోరుతూ జారీ చేసిన అధికారిక నోటీసు.',
      },
      mr: {
        term: 'कारण दाखवा नोटीस (Show Cause Notice)',
        simpleExplanation: 'कर किंवा दंड का आकारू नये याचे लेखी स्पष्टीकरण मागवणारी अधिकृत सरकारी नोटीस.',
      },
      bn: {
        term: 'কারণ দর্শাও নোটিশ (Show Cause Notice)',
        simpleExplanation: 'আপনার বিরুদ্ধে কেন কর বা জরিমানা আরোপ করা হবে না তার ব্যাখ্যা চেয়ে সরকারি কর্তৃপক্ষের প্রাতিষ্ঠানিক নির্দেশ।',
      },
      gu: {
        term: 'કારણ દર્શાવો નોટિસ (Show Cause Notice)',
        simpleExplanation: 'ટેક્સ અથવા દંડ કેમ ન વસૂલ કરવો તે અંગે લેખિત ખુલાસો માંગતી સત્તાવાર નોટિસ.',
      },
    },
  },
  ex_parte: {
    term: 'Ex-Parte Order',
    statuteReference: 'Section 75(4) CGST Act / CPC Order IX',
    translations: {
      en: {
        term: 'Ex-Parte Order',
        simpleExplanation: 'A decision or judgment passed by the officer or judge when the taxpayer fails to attend the hearing or submit a reply.',
      },
      hi: {
        term: 'एकपक्षीय आदेश (Ex-Parte Order)',
        simpleExplanation: 'यदि आप नियत तारीख पर पेश नहीं होते या जवाब नहीं देते, तो अधिकारी केवल विभाग के रिकॉर्ड के आधार पर आपके खिलाफ फैसला सुना देता है।',
      },
      kn: {
        term: 'ಏಕಪಕ್ಷೀಯ ಆದೇಶ (Ex-Parte Order)',
        simpleExplanation: 'ತೆರಿಗೆದಾರರು ವಿಚಾರಣೆಗೆ ಹಾಜರಾಗದಿದ್ದಾಗ ಅಥವಾ ಉತ್ತರ ನೀಡದಿದ್ದಾಗ ಅಧಿಕಾರಿಗಳು ಸ್ವತಂತ್ರವಾಗಿ ಏಕಪಕ್ಷೀಯವಾಗಿ ನೀಡುವ ಆದೇಶ.',
      },
      ta: {
        term: 'ஒருதலைப்பட்ச உத்தரவு (Ex-Parte Order)',
        simpleExplanation: 'விசாரணைக்கு ஆஜராகாத பட்சத்தில் உங்கள் விளக்கத்தைக் கேட்காமல் பிறப்பிக்கப்படும் முடிவு.',
      },
      te: {
        term: 'ఏకపక్ష ఉత్తర్వులు (Ex-Parte Order)',
        simpleExplanation: 'మీరు హాజరుకానప్పుడు లేదా సమాధానం ఇవ్వనప్పుడు అధికారి ఏకపక్షంగా ఇచ్చే తీర్పు.',
      },
      mr: {
        term: 'एकतर्फी आदेश (Ex-Parte Order)',
        simpleExplanation: 'सुनावणीस उपस्थित न राहिल्यास किंवा उत्तर न दिल्यास अधिकाऱ्याने आपल्या अनुपस्थितीत काढलेला आदेश.',
      },
      bn: {
        term: 'একতরফা আদেশ (Ex-Parte Order)',
        simpleExplanation: 'শুনানিতে উপস্থিত না থাকলে করদাতা অনুপস্থিতিতেই জারিকৃত প্রতিকূল প্রশাসনিক রায়।',
      },
      gu: {
        term: 'એકપક્ષીય હુકમ (Ex-Parte Order)',
        simpleExplanation: 'સુનાવણીમાં હાજર ન રહેતાં કરદાતાની ગેરહાજરીમાં પસાર કરવામાં આવતો આખરી આદેશ.',
      },
    },
  },
  itc_mismatch: {
    term: 'Input Tax Credit (ITC) Inconsistency',
    statuteReference: 'Section 16(2)(c) & Rule 36(4) of CGST Rules',
    translations: {
      en: {
        term: 'ITC Mismatch (GSTR-2B vs GSTR-3B)',
        simpleExplanation: 'Tax credit claimed by your company does not match what your suppliers declared in their monthly government filings.',
      },
      hi: {
        term: 'इनपुट टैक्स क्रेडिट (ITC) विसंगति',
        simpleExplanation: 'आपके द्वारा दावा किया गया क्रेडिट आपके सप्लायर द्वारा पोर्टल पर भरे गए डेटा से मेल नहीं खा रहा है।',
      },
      kn: {
        term: 'ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ (ITC) ವ್ಯತ್ಯಾಸ',
        simpleExplanation: 'ನೀವು ಪಡೆದುಕೊಂಡ ತೆರಿಗೆ ವಿನಾಯಿತಿ (ITC) ನಿಮ್ಮ ಸರಬರಾಜುದಾರರು ಜಿಎಸ್‌ಟಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಮೂದಿಸಿದ ಮೊತ್ತಕ್ಕೆ ತಾಳೆಯಾಗುತ್ತಿಲ್ಲ.',
      },
      ta: {
        term: 'உள்ளீட்டு வரி வரவு (ITC) முரண்பாடு',
        simpleExplanation: 'நீங்கள் கோரிய வரவுக்கும் சப்ளையர் சமர்ப்பித்த தரவுக்கும் இடையே உள்ள வேறுபாடு.',
      },
      te: {
        term: 'ఇన్‌పుట్ టాక్స్ క్రెడిట్ (ITC) వ్యత్యాసం',
        simpleExplanation: 'మీరు క్లెయిమ్ చేసిన క్రెడిట్ సరఫరాదారు ప్రభుత్వ పోర్టల్‌లో నమోదు చేసిన వివరాలతో సరిపోలడం లేదు.',
      },
      mr: {
        term: 'इनपुट टॅक्स क्रेडिट (ITC) तफावत',
        simpleExplanation: 'तुम्ही घेतलेली कर सवलत आणि पुरवठादाराने दाखल केलेला तपशील यात आढळलेली तफावत.',
      },
      bn: {
        term: 'ইনপুট ট্যাক্স ক্রেডিট (ITC) অমিল',
        simpleExplanation: 'দাবিকৃত ইনপুট ক্রেডিট আপনার সরবরাহকারী কর্তৃক সরকারের কাছে জমা দেওয়া নথির সাথে মিলছে না।',
      },
      gu: {
        term: 'ઇનપુટ ટેક્સ ક્રેડિટ (ITC) તફાવત',
        simpleExplanation: 'તમે મેળવેલી ટેક્સ ક્રેડિટ અને સપ્લાયરે ભરેલા રિટર્નના આંકડા વચ્ચે જોવા મળેલો તફાવત.',
      },
    },
  },
  adjudicating_authority: {
    term: 'Adjudicating Authority',
    statuteReference: 'Section 2(4) CGST Act / Section 2(7A) Income Tax Act',
    translations: {
      en: {
        term: 'Adjudicating Authority',
        simpleExplanation: 'The authorized statutory government officer (e.g. Assistant Commissioner, Superintendent) designated to decide legal liability.',
      },
      hi: {
        term: 'न्यायनिर्णयन प्राधिकारी (Adjudicating Authority)',
        simpleExplanation: 'वह अधिकृत सरकारी अधिकारी (जैसे सहायक आयुक्त বা अधीक्षक) जो आपके नोटिस और जवाब की न्यायिक जांच करके आदेश पारित करता है।',
      },
      kn: {
        term: 'ನ್ಯಾಯನಿರ್ಣಯ ಪ್ರಾಧಿಕಾರ (Adjudicating Authority)',
        simpleExplanation: 'ನಿಮ್ಮ ಪ್ರಕರಣವನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ಪರಿಶೀಲಿಸಿ ತೀರ್ಪು ನೀಡಲು ಅಧಿಕಾರ ಹೊಂದಿರುವ ಸರಕಾರಿ ಅಧಿಕಾರಿ (ಉದಾ: ಸಹಾಯಕ ಆಯುಕ್ತರು).',
      },
      ta: {
        term: 'தீர்ப்பளிக்கும் அதிகாரி (Adjudicating Authority)',
        simpleExplanation: 'உங்கள் வழக்கைப் பரிசீலித்து இறுதி உத்தரவை வழங்கும் சட்டப்பூர்வ அரசு அதிகாரி.',
      },
      te: {
        term: 'తీర్పు అధికారి (Adjudicating Authority)',
        simpleExplanation: 'మీ కేసును పరిశీలించి చట్టపరమైన నిర్ణయం తీసుకునే అధికారిక ప్రభుత్వ ఉద్యోగి.',
      },
      mr: {
        term: 'न्यायनिर्णय अधिकारी (Adjudicating Authority)',
        simpleExplanation: 'प्रकरणाची सुनावणी घेऊन कायदेशीर निर्णय देणारा अधिकृत वर्ग-१ सरकारी अधिकारी.',
      },
      bn: {
        term: 'বিচার বিভাগীয় কর্মকর্তা (Adjudicating Authority)',
        simpleExplanation: 'আইনগত দায় নির্ধারণ ও শুনানির পর আদেশ প্রদানের ক্ষমতাপ্রাপ্ত রাজস্ব কর্মকর্তা।',
      },
      gu: {
        term: 'ન્યાયિક નિર્ણય અધિકારી (Adjudicating Authority)',
        simpleExplanation: 'કેસની સુનાવણી કરી કાયદેસરનો ફેંસલો સંભળાવવા સક્ષમ નિયુક્ત સરકારી અધિકારી.',
      },
    },
  },
  statutory_interest: {
    term: 'Statutory Interest (Section 50)',
    statuteReference: 'Section 50(1) CGST Act, 2017 (18% p.a.)',
    translations: {
      en: {
        term: 'Mandatory Statutory Interest',
        simpleExplanation: 'Automatic 18% annual interest levied by law on any delayed tax payment. This interest cannot be waived by the officer.',
      },
      hi: {
        term: 'वैधानिक ब्याज (Statutory Interest)',
        simpleExplanation: 'कर भुगतान में देरी पर कानूनन लगने वाला अनिवार्य 18% वार्षिक ब्याज, जिसे अधिकारी भी माफ नहीं कर सकता।',
      },
      kn: {
        term: 'ಕಾನೂನುಬದ್ಧ ಬಡ್ಡಿ (Section 50)',
        simpleExplanation: 'ತೆರಿಗೆ ವಿಳಂಬ ಪಾವತಿಗೆ ಕಾನೂನಿನ ಪ್ರಕಾರ ವಿಧಿಸಲಾಗುವ ವಾರ್ಷಿಕ 18% ಕಡ್ಡಾಯ ಬಡ್ಡಿ.',
      },
      ta: {
        term: 'சட்டப்படியான வட்டி (Statutory Interest)',
        simpleExplanation: 'தாமதமான வரி செலுத்தலுக்கு சட்டப்படி விதிக்கப்படும் கட்டாய 18% ஆண்டு வட்டி.',
      },
      te: {
        term: 'చట్టబద్ధమైన వడ్డీ (Statutory Interest)',
        simpleExplanation: 'పన్ను ఆలస్య చెల్లింపుపై చట్టప్రకారం విధించే తప్పనిసరి 18% వార్షిక వడ్డీ.',
      },
      mr: {
        term: 'कायदेशीर व्याज (Section 50)',
        simpleExplanation: 'कर उशिरा भरल्याबद्दल कायद्याने आकारले जाणारे अनिवार्य १८% वार्षिक व्याज.',
      },
      bn: {
        term: 'বিধিবদ্ধ সুদ (Statutory Interest)',
        simpleExplanation: 'বিলম্বিত কর পরিশোধের জন্য আইন অনুসারে প্রযোজ্য বাধ্যতামূলক বার্ষিক ১৮% সুদ।',
      },
      gu: {
        term: 'કાયદેસર વ્યાજ (Section 50)',
        simpleExplanation: 'વિલંબિત ટેક્સ ભરપાઈ પર કાયદા મુજબ લાગુ પડતું ફરજિયાત વાર્ષિક ૧૮% વ્યાજ.',
      },
    },
  },
};

/**
 * Detect Language & Script distribution via Unicode analysis
 */
export function detectDocumentLanguage(text: string): DetectedLanguageInfo {
  if (!text || text.trim().length === 0) {
    return {
      primaryLanguage: 'en',
      languageName: 'English',
      confidence: 100,
      detectedScripts: ['Latin'],
      isBilingual: false,
      details: 'Standard Latin script detected',
    };
  }

  let kannadaCount = 0;
  let devanagariCount = 0;
  let tamilCount = 0;
  let teluguCount = 0;
  let bengaliCount = 0;
  let gujaratiCount = 0;
  let latinCount = 0;
  let totalScriptChars = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0x0c80 && code <= 0x0cff) {
      kannadaCount++;
      totalScriptChars++;
    } else if (code >= 0x0900 && code <= 0x097f) {
      devanagariCount++;
      totalScriptChars++;
    } else if (code >= 0x0b80 && code <= 0x0bff) {
      tamilCount++;
      totalScriptChars++;
    } else if (code >= 0x0c00 && code <= 0x0c7f) {
      teluguCount++;
      totalScriptChars++;
    } else if (code >= 0x0980 && code <= 0x09ff) {
      bengaliCount++;
      totalScriptChars++;
    } else if (code >= 0x0a80 && code <= 0x0aff) {
      gujaratiCount++;
      totalScriptChars++;
    } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      latinCount++;
      totalScriptChars++;
    }
  }

  const scriptsDetected: string[] = [];
  if (kannadaCount > 15) scriptsDetected.push('Kannada');
  if (devanagariCount > 15) scriptsDetected.push('Devanagari');
  if (tamilCount > 15) scriptsDetected.push('Tamil');
  if (teluguCount > 15) scriptsDetected.push('Telugu');
  if (bengaliCount > 15) scriptsDetected.push('Bengali');
  if (gujaratiCount > 15) scriptsDetected.push('Gujarati');
  if (latinCount > 15) scriptsDetected.push('Latin');

  if (totalScriptChars === 0) {
    return {
      primaryLanguage: 'en',
      languageName: 'English',
      confidence: 90,
      detectedScripts: ['Latin'],
      isBilingual: false,
      details: 'Defaulted to English (alphanumeric)',
    };
  }

  // Determine highest regional presence
  const kannadaRatio = kannadaCount / totalScriptChars;
  const devanagariRatio = devanagariCount / totalScriptChars;
  const tamilRatio = tamilCount / totalScriptChars;
  const teluguRatio = teluguCount / totalScriptChars;
  const bengaliRatio = bengaliCount / totalScriptChars;
  const gujaratiRatio = gujaratiCount / totalScriptChars;

  const isBilingual = (latinCount > 30) && (
    kannadaCount > 30 || devanagariCount > 30 || tamilCount > 30 || 
    teluguCount > 30 || bengaliCount > 30 || gujaratiCount > 30
  );

  if (kannadaRatio > 0.15) {
    const conf = Math.min(99, Math.round(50 + kannadaRatio * 60));
    return {
      primaryLanguage: 'kn',
      languageName: 'Kannada',
      confidence: conf,
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual 
        ? `Bilingual Notice: Kannada (${Math.round(kannadaRatio * 100)}%) + English (${Math.round((latinCount / totalScriptChars) * 100)}%)` 
        : `Kannada Script (${Math.round(kannadaRatio * 100)}%) detected`,
    };
  }

  if (devanagariRatio > 0.15) {
    // Check Marathi specific words or default to Hindi
    const isMarathi = /महाराष्ट्र|कार्यालय|सादर|तपासणी/i.test(text);
    const langCode: SupportedLanguage = isMarathi ? 'mr' : 'hi';
    const langName = isMarathi ? 'Marathi' : 'Hindi';
    const conf = Math.min(99, Math.round(50 + devanagariRatio * 60));
    return {
      primaryLanguage: langCode,
      languageName: langName,
      confidence: conf,
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual 
        ? `Bilingual Notice: ${langName} (${Math.round(devanagariRatio * 100)}%) + English` 
        : `${langName} Script detected`,
    };
  }

  if (tamilRatio > 0.15) {
    return {
      primaryLanguage: 'ta',
      languageName: 'Tamil',
      confidence: Math.min(99, Math.round(50 + tamilRatio * 60)),
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual ? 'Bilingual Notice: Tamil + English' : 'Tamil Script detected',
    };
  }

  if (teluguRatio > 0.15) {
    return {
      primaryLanguage: 'te',
      languageName: 'Telugu',
      confidence: Math.min(99, Math.round(50 + teluguRatio * 60)),
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual ? 'Bilingual Notice: Telugu + English' : 'Telugu Script detected',
    };
  }

  if (bengaliRatio > 0.15) {
    return {
      primaryLanguage: 'bn',
      languageName: 'Bengali',
      confidence: Math.min(99, Math.round(50 + bengaliRatio * 60)),
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual ? 'Bilingual Notice: Bengali + English' : 'Bengali Script detected',
    };
  }

  if (gujaratiRatio > 0.15) {
    return {
      primaryLanguage: 'gu',
      languageName: 'Gujarati',
      confidence: Math.min(99, Math.round(50 + gujaratiRatio * 60)),
      detectedScripts: scriptsDetected,
      isBilingual,
      details: isBilingual ? 'Bilingual Notice: Gujarati + English' : 'Gujarati Script detected',
    };
  }

  return {
    primaryLanguage: 'en',
    languageName: 'English',
    confidence: 96,
    detectedScripts: ['Latin'],
    isBilingual: false,
    details: 'English (Latin script) predominantly detected',
  };
}

/**
 * Extract protected entities that must NEVER be altered during translation:
 * - DIN numbers (DIN-YYYYMMDD-XXXXX-...)
 * - PANs & GSTINs (e.g. 29AABCU9603R1ZK)
 * - Rupee amounts (₹X,XX,XXX or Rs. X,XX,XXX)
 * - Statutory sections (Section 73(1), Section 143(2), Rule 36(4))
 * - Dates
 */
export interface ProtectedEntity {
  type: 'din' | 'gstin_pan' | 'amount' | 'citation' | 'date';
  raw: string;
}

export function extractProtectedEntities(notice: Notice): ProtectedEntity[] {
  const entities: ProtectedEntity[] = [];

  if (notice.din) {
    entities.push({ type: 'din', raw: notice.din });
  }

  if (notice.recipientGstinOrPan) {
    entities.push({ type: 'gstin_pan', raw: notice.recipientGstinOrPan });
  }

  if (notice.demandAmountInr) {
    entities.push({
      type: 'amount',
      raw: `₹${notice.demandAmountInr.toLocaleString('en-IN')}`,
    });
  }

  if (notice.referenceNumber) {
    entities.push({ type: 'din', raw: notice.referenceNumber });
  }

  notice.legalCitations.forEach((c) => {
    entities.push({
      type: 'citation',
      raw: `${c.act} - ${c.section}`,
    });
  });

  if (notice.dateIssued) {
    entities.push({ type: 'date', raw: notice.dateIssued });
  }
  if (notice.responseDeadline) {
    entities.push({ type: 'date', raw: notice.responseDeadline });
  }

  return entities;
}

/**
 * Get or synthesize NoticeTranslation for any requested supported language.
 * Ensures original legal sections, DIN, and exact figures remain intact.
 */
export function getNoticeTranslation(
  notice: Notice,
  targetLanguage: SupportedLanguage
): NoticeTranslation {
  // 1. If explicit cached translation exists, return it
  if (notice.translations && notice.translations[targetLanguage]) {
    return notice.translations[targetLanguage]!;
  }

  // 2. Otherwise generate dynamic high-fidelity translation preserving all legal terms and numerals
  const meta = SUPPORTED_LANGUAGES.find((l) => l.code === targetLanguage) || SUPPORTED_LANGUAGES[0];

  const glossaryItems: GlossaryItem[] = Object.values(LEGAL_GLOSSARY_REGISTRY).map((g) => ({
    term: g.translations[targetLanguage]?.term || g.term,
    originalTerm: g.term,
    simpleExplanation: g.translations[targetLanguage]?.simpleExplanation || g.translations.en.simpleExplanation,
    statuteReference: g.statuteReference,
  }));

  const amountStr = notice.demandAmountInr
    ? `₹${notice.demandAmountInr.toLocaleString('en-IN')}`
    : 'Not Specified';

  // Language templates preserving exact entities
  switch (targetLanguage) {
    case 'kn':
      return {
        language: 'kn',
        languageLabel: 'ಕನ್ನಡ (Kannada)',
        title: `${notice.title} [ಕನ್ನಡ ಅನುವಾದ]`,
        plainSummary: notice.kannadaSummary || `ಈ ಕಾನೂನು ನೋಟಿಸ್ ${notice.issuingAuthority.name} ವತಿಯಿಂದ ನೀಡಲಾಗಿದ್ದು, ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ: ${notice.referenceNumber}. ಒಟ್ಟು ಬಾಕಿ ಬೇಡಿಕೆ: ${amountStr}. ಸೆಕ್ಷನ್ ವಿವರಗಳು ಮತ್ತು ಮೂಲ ಕಡತ ಬದಲಾಗದೆ ಉಳಿದಿವೆ.`,
        whyReceived: `ಜಿಎಸ್‌ಟಿ ರಿಟರ್ನ್ಸ್‌ನಲ್ಲಿನ ವ್ಯತ್ಯಾಸಗಳು ಅಥವಾ ಕಾಯ್ದೆ ಪ್ರಕಾರ ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ ಒದಗಿಸಲು ಈ ನೋಟಿಸ್ ನೀಡಲಾಗಿದೆ (${notice.referenceNumber}).`,
        actionItems: notice.actionItems.map(
          (a) => `[ಕಡ್ಡಾಯ ಕ್ರಮ] ${a.text} (ಅಂತಿಮ ಗಡುವು: ${notice.responseDeadline})`
        ),
        legalExplanation: `ಈ ನೋಟಿಸ್‌ನಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಕಾಯ್ದೆಗಳು ಮತ್ತು ಸೆಕ್ಷನ್‌ಗಳು ಬದಲಾಗದೆ ಮೂಲ ರೂಪದಲ್ಲಿ ಅನ್ವಯಿಸುತ್ತವೆ: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `ಅಂತಿಮ ಗಡುವು: ${notice.responseDeadline}. ಗಡುವಿನೊಳಗೆ ಉತ್ತರಿಸದಿದ್ದರೆ ಏಕಪಕ್ಷೀಯ (Ex-Parte) ದಂಡ ವಿಧಿಸಬಹುದು.`,
        glossary: glossaryItems,
      };

    case 'hi':
      return {
        language: 'hi',
        languageLabel: 'हिन्दी (Hindi)',
        title: `${notice.title} [हिन्दी अनुवाद]`,
        plainSummary: `यह नोटिस ${notice.issuingAuthority.name} द्वारा जारी किया गया है। संदर्भ संख्या: ${notice.referenceNumber}। कुल मांग राशि: ${amountStr}। नोटिस की सभी कानूनी धाराएं और संदर्भ सुरक्षित रखे गए हैं।`,
        whyReceived: notice.whyReceived 
          ? `विभागीय समीक्षा के अनुसार: ${notice.whyReceived}` 
          : `वार्षिक रिटर्न या दाखिल प्रपत्रों में विसंगति के कारण यह नोटिस जारी किया गया है। संदर्भ संख्या: ${notice.referenceNumber}।`,
        actionItems: notice.actionItems.map(
          (a) => `[अनिवार्य कार्रवाई] ${a.text} (अंतिम तिथि: ${notice.responseDeadline})`
        ),
        legalExplanation: `संबद्ध कानूनी धाराएं: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}। कानूनन नोटिस का जवाब निर्धारित समय सीमा में दाखिल करना आवश्यक है।`,
        urgencyNote: `प्रतिक्रिया की अंतिम तिथि: ${notice.responseDeadline}। समय पर अनुपालन न होने पर एकपक्षीय वसूली आदेश जारी हो सकता है।`,
        glossary: glossaryItems,
      };

    case 'ta':
      return {
        language: 'ta',
        languageLabel: 'தமிழ் (Tamil)',
        title: `${notice.title} [தமிழ் வடிவம்]`,
        plainSummary: `இந்த சட்ட நோட்டீஸ் ${notice.issuingAuthority.name} மூலம் அனுப்பப்பட்டுள்ளது. குறிப்பு எண்: ${notice.referenceNumber}. கோரிக்கை தொகை: ${amountStr}. சட்டப்பிரிவுகள் மாற்றமின்றி பாதுகாக்கப்பட்டுள்ளன.`,
        whyReceived: `தாக்கல் செய்யப்பட்ட அறிக்கைகளில் உள்ள முரண்பாடுகளை சரிசெய்ய இந்த நோட்டீஸ் வழங்கப்பட்டுள்ளது. குறிப்பு: ${notice.referenceNumber}.`,
        actionItems: notice.actionItems.map((a) => `[அவசர நடவடிக்கை] ${a.text}`),
        legalExplanation: `சட்டப்பிரிவுகள்: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `பதில் அளிக்க இறுதி நாள்: ${notice.responseDeadline}. தவறினால் சட்டரீதியான அபராதம் விதிக்கப்படலாம்.`,
        glossary: glossaryItems,
      };

    case 'te':
      return {
        language: 'te',
        languageLabel: 'తెలుగు (Telugu)',
        title: `${notice.title} [తెలుగు అనువాదం]`,
        plainSummary: `ఈ చట్టపరమైన నోటీసు ${notice.issuingAuthority.name} ద్వారా జారీ చేయబడింది. రిఫరెన్స్ నంబర్: ${notice.referenceNumber}. డిమాండ్ మొత్తం: ${amountStr}. అన్ని చట్టపరమైన విభాగాలు యథాతథంగా ఉంచబడ్డాయి.`,
        whyReceived: `దాఖలు చేసిన పన్ను రిటర్న్‌లలో వ్యత్యాసాల కారణంగా ఈ నోటీసు జారీ చేయబడింది.`,
        actionItems: notice.actionItems.map((a) => `[తప్పనిసరి చర్య] ${a.text}`),
        legalExplanation: `చట్ట నిబంధనలు: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `చివరి తేదీ: ${notice.responseDeadline}. గడువు దాటితే ఏకపక్ష పెనాల్టీ విధించే అవకాశం ఉంది.`,
        glossary: glossaryItems,
      };

    case 'mr':
      return {
        language: 'mr',
        languageLabel: 'मराठी (Marathi)',
        title: `${notice.title} [मराठी सारांश]`,
        plainSummary: `ही नोटीस ${notice.issuingAuthority.name} कडून पाठवण्यात आली आहे. संदर्भ क्रमांक: ${notice.referenceNumber}. एकूण मागणी रक्कम: ${amountStr}. सर्व कायदेशीर कलमे जशीच्या तशी राखली आहेत.`,
        whyReceived: `दाखल केलेल्या विवरणपत्रांमधील तफावतीमुळे ही नोटीस बजावण्यात आली आहे. संदर्भ: ${notice.referenceNumber}.`,
        actionItems: notice.actionItems.map((a) => `[आवश्यक कृती] ${a.text}`),
        legalExplanation: `कायदेशीर कलमे: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `अंतिम मुदत: ${notice.responseDeadline}. वेळेत उत्तर न दिल्यास एकतर्फी कारवाई होऊ शकते.`,
        glossary: glossaryItems,
      };

    case 'bn':
      return {
        language: 'bn',
        languageLabel: 'বাংলা (Bengali)',
        title: `${notice.title} [বাংলা অনুবাদ]`,
        plainSummary: `এই আইনি নোটিশটি ${notice.issuingAuthority.name} দ্বারা জারি করা হয়েছে। রেফারেন্স নং: ${notice.referenceNumber}। দাবিকৃত অর্থ: ${amountStr}। সকল বিধিবদ্ধ ধারা অপরিবর্তিত রাখা হয়েছে।`,
        whyReceived: `দাখিলকৃত তথ্যাদির অসামঞ্জস্যের প্রেক্ষিতে এই নোটিশ পাঠানো হয়েছে।`,
        actionItems: notice.actionItems.map((a) => `[জরুরি পদক্ষেপ] ${a.text}`),
        legalExplanation: `প্রযোজ্য আইনি ধারা: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `জবাব জমা দেওয়ার শেষ তারিখ: ${notice.responseDeadline}। সময়মত উত্তর না দিলে একতরফা নির্দেশ জারি হতে পারে।`,
        glossary: glossaryItems,
      };

    case 'gu':
      return {
        language: 'gu',
        languageLabel: 'ગુજરાતી (Gujarati)',
        title: `${notice.title} [ગુજરાતી અનુવાદ]`,
        plainSummary: `આ કાનૂની નોટિસ ${notice.issuingAuthority.name} તરફથી મોકલવામાં આવી છે. રેફરન્સ નંબર: ${notice.referenceNumber}. માંગણી રકમ: ${amountStr}. તમામ કાનૂની કલમો અપરિવર્તિત છે.`,
        whyReceived: `ભરેલા રિટર્નમાં વિસંગતતા હોવાના કારણે આ નોટિસ જારી કરવામાં આવી છે.`,
        actionItems: notice.actionItems.map((a) => `[જરૂરી પગલું] ${a.text}`),
        legalExplanation: `લાગુ પડતી કલમો: ${notice.legalCitations.map(c => `${c.act} ${c.section}`).join(', ')}.`,
        urgencyNote: `જવાબ આપવાની છેલ્લી તારીખ: ${notice.responseDeadline}. વિલંબ થતાં એકપક્ષીય દંડ લાગી શકે છે.`,
        glossary: glossaryItems,
      };

    case 'en':
    default:
      return {
        language: 'en',
        languageLabel: 'English',
        title: notice.title,
        plainSummary: notice.plainSummary,
        whyReceived: notice.whyReceived,
        actionItems: notice.actionItems.map((a) => a.text),
        legalExplanation: `Governed by: ${notice.legalCitations.map(c => `${c.act} ${c.section} (${c.plainMeaning})`).join('; ')}.`,
        urgencyNote: `Statutory response deadline is ${notice.responseDeadline}. Inaction risks ex-parte order under applicable tax procedures.`,
        glossary: glossaryItems,
      };
  }
}
