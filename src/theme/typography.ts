import { Platform } from 'react-native';

// Official Space Apps fonts: Fira Sans for headlines, Overpass for body.
// On web the webfont arrives a moment after first paint, so each family carries a system
// fallback stack — without it the browser falls back to its serif default and the first
// frame looks nothing like the design. Native resolves the single registered name.
const stack = (family: string, fallback: string) =>
  Platform.OS === 'web' ? `${family}, ${fallback}` : family;

const SANS = '"Segoe UI", Roboto, system-ui, -apple-system, Helvetica, Arial, sans-serif';

export const fonts = {
  display: stack('FiraSans_900Black', SANS),
  heading: stack('FiraSans_700Bold', SANS),
  body: stack('Overpass_400Regular', SANS),
  bodyMedium: stack('Overpass_500Medium', SANS),
  bodyBold: stack('Overpass_700Bold', SANS),
};
