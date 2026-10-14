export const consentLanguages = ["en", "si", "ta"] as const;
export type ConsentLanguage = (typeof consentLanguages)[number];

export function consentPdfHref(language: ConsentLanguage) {
  return `/docs/parental-consent-letter${language === "en" ? "" : `-${language}`}.pdf`;
}

export const consentCopy = {
  en: {
    download: "Download consent letter (PDF)",
    languageLabel: "Letter language",
    languageName: "English",
    intro: "For participants under 18 at the Kandy local event. Download the consent letter, complete it and bring a signed copy to check-in. A parent or legal guardian must register the participant and accompany them throughout the event.",
    conditionsTitle: "Participation conditions",
    conditions: [
      "A parent or legal guardian must complete the official NASA Space Apps registration for the participant and accompany them at all times during the event. A signed letter does not replace either requirement.",
      "Bring the signed letter to the Kandy organising team at check-in. Contact the team before attending to confirm guardian access and arrival and departure arrangements.",
      "Treat participants, mentors and organisers with respect. Bullying, harassment and discrimination are not acceptable. Report concerns to the organising team.",
      "Follow venue rules and organisers’ safety instructions. Take care of shared equipment and keep emergency exits clear.",
      "Credit sources and follow the official project and licensing rules. Do not share another person’s contact details, photographs or private information without permission.",
    ],
    terms: "Official NASA Space Apps participant terms",
  },
  si: {
    download: "කැමැත්ත ප්‍රකාශ කිරීමේ ලිපිය බාගන්න (PDF)",
    languageLabel: "ලිපියේ භාෂාව",
    languageName: "සිංහල",
    intro: "මහනුවර දේශීය වැඩසටහනට එක්වන වයස අවුරුදු 18ට අඩු සහභාගිවන්නන් සඳහාය. කැමැත්ත ප්‍රකාශ කිරීමේ ලිපිය බාගත කර, සම්පූර්ණ කර, අත්සන් කළ පිටපත පැමිණීමේදී රැගෙන එන්න. මව්පියෙකු හෝ නීත්‍යනුකූල භාරකරුවෙකු ලියාපදිංචිය සිදු කළ යුතු අතර වැඩසටහන පුරාම සහභාගිවන්නා සමඟ සිටිය යුතුය.",
    conditionsTitle: "සහභාගීත්ව කොන්දේසි",
    conditions: [
      "මව්පියෙකු හෝ නීත්‍යනුකූල භාරකරුවෙකු සහභාගිවන්නා වෙනුවෙන් නිල NASA Space Apps ලියාපදිංචිය සම්පූර්ණ කළ යුතු අතර වැඩසටහන පුරාම ඔහු හෝ ඇය සමඟ සිටිය යුතුය. අත්සන් කළ ලිපියක් මෙම අවශ්‍යතා දෙක වෙනුවට භාවිත කළ නොහැක.",
      "පැමිණීමේදී අත්සන් කළ ලිපිය මහනුවර සංවිධායක කණ්ඩායමට භාර දෙන්න. භාරකරුගේ ප්‍රවේශය සහ පැමිණීමේ හා පිටවීමේ කටයුතු තහවුරු කර ගැනීමට කලින් කණ්ඩායම අමතන්න.",
      "සහභාගිවන්නන්ට, උපදේශකයන්ට සහ සංවිධායකයන්ට ගෞරවයෙන් සලකන්න. හිරිහැර කිරීම, තර්ජනය කිරීම සහ වෙනස්කම් කිරීම පිළිගත නොහැක. ගැටලු සංවිධායක කණ්ඩායමට දන්වන්න.",
      "ස්ථානයේ නීති සහ සංවිධායකයන්ගේ ආරක්ෂක උපදෙස් පිළිපදින්න. පොදු උපකරණ ආරක්ෂා කර හදිසි පිටවීම් අවහිර නොකරන්න.",
      "මූලාශ්‍ර සඳහන් කර නිල ව්‍යාපෘති සහ බලපත්‍ර නීති පිළිපදින්න. අවසරයකින් තොරව වෙනත් අයෙකුගේ සම්බන්ධතා විස්තර, ඡායාරූප හෝ පෞද්ගලික තොරතුරු බෙදා නොගන්න.",
    ],
    terms: "නිල NASA Space Apps සහභාගීත්ව කොන්දේසි",
  },
  ta: {
    download: "ஒப்புதல் கடிதத்தைப் பதிவிறக்கவும் (PDF)",
    languageLabel: "கடிதத்தின் மொழி",
    languageName: "தமிழ்",
    intro: "கண்டி உள்ளூர் நிகழ்வில் பங்கேற்கும் 18 வயதுக்குட்பட்டவர்களுக்கானது. ஒப்புதல் கடிதத்தைப் பதிவிறக்கி, பூர்த்திசெய்து, கையொப்பமிட்ட பிரதியை வருகைப் பதிவின்போது கொண்டுவரவும். பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலர் பங்கேற்பாளரைப் பதிவுசெய்து, நிகழ்வு முழுவதும் அவருடன் இருக்க வேண்டும்.",
    conditionsTitle: "பங்கேற்பு நிபந்தனைகள்",
    conditions: [
      "பெற்றோர் அல்லது சட்டபூர்வ பாதுகாவலர் பங்கேற்பாளருக்கான அதிகாரபூர்வ NASA Space Apps பதிவை நிறைவுசெய்து, நிகழ்வு முழுவதும் அவருடன் இருக்க வேண்டும். கையொப்பமிட்ட கடிதம் இந்த இரு தேவைகளுக்கும் மாற்றாகாது.",
      "வருகைப் பதிவின்போது கையொப்பமிட்ட கடிதத்தைக் கண்டி ஏற்பாட்டுக் குழுவிடம் வழங்கவும். பாதுகாவலரின் அனுமதி மற்றும் வருகை, புறப்பாடு ஏற்பாடுகளை உறுதிசெய்ய முன்கூட்டியே குழுவைத் தொடர்புகொள்ளவும்.",
      "பங்கேற்பாளர்கள், வழிகாட்டிகள் மற்றும் ஏற்பாட்டாளர்களை மரியாதையுடன் நடத்தவும். மிரட்டல், துன்புறுத்தல் மற்றும் பாகுபாடு ஏற்கப்படாது. பிரச்சினைகளை ஏற்பாட்டுக் குழுவிடம் தெரிவிக்கவும்.",
      "நிகழ்விட விதிகளையும் ஏற்பாட்டாளர்களின் பாதுகாப்பு அறிவுறுத்தல்களையும் பின்பற்றவும். பொதுவான உபகரணங்களைப் பாதுகாத்து, அவசர வெளியேறும் வழிகளைத் தடையின்றி வைத்திருக்கவும்.",
      "மூலங்களைக் குறிப்பிட்டு அதிகாரபூர்வ திட்ட மற்றும் உரிம விதிகளைப் பின்பற்றவும். அனுமதியின்றி மற்றவர்களின் தொடர்பு விவரங்கள், புகைப்படங்கள் அல்லது தனிப்பட்ட தகவல்களைப் பகிர வேண்டாம்.",
    ],
    terms: "அதிகாரபூர்வ NASA Space Apps பங்கேற்பாளர் விதிமுறைகள்",
  },
} as const;
