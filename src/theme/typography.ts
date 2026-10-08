import { Platform } from 'react-native';

// Design system fonts: Space Grotesk for display/headlines, Plus Jakarta Sans for body.
// On web the webfont arrives a moment after first paint, so each family carries a system
// fallback stack — without it the browser falls back to its serif default and the first
// frame looks nothing like the design. Native resolves the single registered name.
const stack = (family: string, fallback: string) =>
  Platform.OS === 'web' ? `${family}, ${fallback}` : family;

const SANS = '"Segoe UI", Roboto, system-ui, -apple-system, Helvetica, Arial, sans-serif';

export const fonts = {
  display: stack('SpaceGrotesk_700Bold', SANS),
  body: stack('PlusJakartaSans_400Regular', SANS),
  bodyMedium: stack('PlusJakartaSans_500Medium', SANS),
  bodyBold: stack('PlusJakartaSans_700Bold', SANS),
};
