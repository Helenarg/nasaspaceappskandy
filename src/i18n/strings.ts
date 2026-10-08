/**
 * UI strings for the shared chrome (navigation, hero, footer, form plumbing).
 *
 * TRANSLATION STATUS: the Sinhala (si) and Tamil (ta) strings below are a first pass
 * and MUST be reviewed by a native speaker on the organising committee before launch.
 * Page body copy is still English-only; see docs/I18N.md for the list of what is left.
 * Any key missing from si/ta falls back to English rather than showing the raw key.
 */

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'si', label: 'සිං', name: 'සිංහල' },
  { code: 'ta', label: 'தமி', name: 'தமிழ்' },
] as const;

export type Lang = (typeof LANGUAGES)[number]['code'];

const en = {
  'nav.about': 'About',
  'nav.events': 'Events',
  'nav.challenges': 'Challenges',
  'nav.ambassadors': 'Ambassadors',
  'nav.join': 'Join Us',
  'nav.sponsors': 'Sponsors',
  'nav.news': 'News',
  'nav.contact': 'Contact',
  'nav.register': 'REGISTER NOW',
  'nav.registerLong': 'REGISTER FOR HACKATHON',
  'nav.openMenu': 'Open navigation menu',
  'nav.closeMenu': 'Close navigation menu',
  'nav.language': 'Language',
  'nav.tagline': 'KANDY LOCAL EVENT',

  'hero.badge': 'OFFICIAL NATIONAL DOMAIN',
  'hero.cta.primary': 'JOIN HACKATHON',
  'hero.cta.secondary': 'EXPLORE CHALLENGES',
  'hero.highlight.sprint': '48H Global Sprint',
  'hero.highlight.provinces': '9-Province Reach',
  'hero.highlight.data': 'NASA Open Data',

  'footer.explore': 'EXPLORE',
  'footer.getInvolved': 'GET INVOLVED',
  'footer.hackathon': 'ANNUAL HACKATHON',

  'form.required': 'Required',
  'form.sending': 'SENDING…',
  'form.fixErrors': 'Please fix the highlighted fields.',
  'form.errorEmail': 'That email address does not look right.',
  'form.errorPhone': 'Use a Sri Lankan number, e.g. 071 234 5678.',
  'form.errorOffline': 'No connection to the server. Check your network and try again.',
};

export type StringKey = keyof typeof en;

const si: Partial<Record<StringKey, string>> = {
  'nav.about': 'අප ගැන',
  'nav.events': 'වැඩසටහන්',
  'nav.challenges': 'අභියෝග',
  'nav.ambassadors': 'තානාපතිවරු',
  'nav.join': 'එකතු වන්න',
  'nav.sponsors': 'අනුග්‍රාහකයින්',
  'nav.news': 'පුවත්',
  'nav.contact': 'සම්බන්ධ වන්න',
  'nav.register': 'ලියාපදිංචි වන්න',
  'nav.registerLong': 'හැකතන් සඳහා ලියාපදිංචි වන්න',
  'nav.openMenu': 'මෙනුව විවෘත කරන්න',
  'nav.closeMenu': 'මෙනුව වසන්න',
  'nav.language': 'භාෂාව',
  'nav.tagline': 'මහනුවර දේශීය වැඩසටහන',

  'hero.badge': 'නිල ජාතික වසම',
  'hero.cta.primary': 'හැකතන් එක්වන්න',
  'hero.cta.secondary': 'අභියෝග බලන්න',
  'hero.highlight.sprint': 'පැය 48 ගෝලීය තරගය',
  'hero.highlight.provinces': 'පළාත් 9 ක ව්‍යාප්තිය',
  'hero.highlight.data': 'NASA විවෘත දත්ත',

  'footer.explore': 'ගවේෂණය',
  'footer.getInvolved': 'සම්බන්ධ වන්න',
  'footer.hackathon': 'වාර්ෂික හැකතන්',

  'form.required': 'අවශ්‍යයි',
  'form.sending': 'යවමින්…',
  'form.fixErrors': 'කරුණාකර ලකුණු කළ ක්ෂේත්‍ර නිවැරදි කරන්න.',
  'form.errorEmail': 'ඊමේල් ලිපිනය වලංගු නොවේ.',
  'form.errorPhone': 'ශ්‍රී ලාංකික දුරකථන අංකයක් යොදන්න, උදා: 071 234 5678.',
  'form.errorOffline': 'සේවාදායකයට සම්බන්ධ විය නොහැක. නැවත උත්සාහ කරන්න.',
};

const ta: Partial<Record<StringKey, string>> = {
  'nav.about': 'எங்களைப் பற்றி',
  'nav.events': 'நிகழ்வுகள்',
  'nav.challenges': 'சவால்கள்',
  'nav.ambassadors': 'தூதுவர்கள்',
  'nav.join': 'இணையுங்கள்',
  'nav.sponsors': 'அனுசரணையாளர்கள்',
  'nav.news': 'செய்திகள்',
  'nav.contact': 'தொடர்பு',
  'nav.register': 'பதிவு செய்க',
  'nav.registerLong': 'ஹக்கத்தானுக்குப் பதிவு செய்க',
  'nav.openMenu': 'பட்டியைத் திறக்க',
  'nav.closeMenu': 'பட்டியை மூடு',
  'nav.language': 'மொழி',
  'nav.tagline': 'கண்டி உள்ளூர் நிகழ்வு',

  'hero.badge': 'அதிகாரபூர்வ தேசிய களம்',
  'hero.cta.primary': 'ஹக்கத்தானில் சேருங்கள்',
  'hero.cta.secondary': 'சவால்களைப் பாருங்கள்',
  'hero.highlight.sprint': '48 மணி நேர உலகளாவிய போட்டி',
  'hero.highlight.provinces': '9 மாகாணங்களில்',
  'hero.highlight.data': 'NASA திறந்த தரவு',

  'footer.explore': 'ஆராயுங்கள்',
  'footer.getInvolved': 'பங்கேற்க',
  'footer.hackathon': 'வருடாந்த ஹக்கத்தான்',

  'form.required': 'தேவை',
  'form.sending': 'அனுப்புகிறது…',
  'form.fixErrors': 'குறிக்கப்பட்ட புலங்களைச் சரிசெய்யவும்.',
  'form.errorEmail': 'மின்னஞ்சல் முகவரி சரியாகத் தெரியவில்லை.',
  'form.errorPhone': 'இலங்கை தொலைபேசி எண்ணைப் பயன்படுத்தவும், எ.கா. 071 234 5678.',
  'form.errorOffline': 'சேவையகத்துடன் இணைப்பு இல்லை. மீண்டும் முயலவும்.',
};

export const DICTIONARIES: Record<Lang, Partial<Record<StringKey, string>>> = { en, si, ta };
