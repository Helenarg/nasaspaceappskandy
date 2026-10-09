import { useFonts } from 'expo-font';
import { NotoSansSinhala_400Regular } from '@expo-google-fonts/noto-sans-sinhala/400Regular';
import { NotoSansSinhala_700Bold } from '@expo-google-fonts/noto-sans-sinhala/700Bold';
import { NotoSansTamil_400Regular } from '@expo-google-fonts/noto-sans-tamil/400Regular';
import { NotoSansTamil_700Bold } from '@expo-google-fonts/noto-sans-tamil/700Bold';
import { FiraSans_900Black } from '@expo-google-fonts/fira-sans/900Black';
import { FiraSans_700Bold } from '@expo-google-fonts/fira-sans/700Bold';
import { Overpass_400Regular } from '@expo-google-fonts/overpass/400Regular';
import { Overpass_500Medium } from '@expo-google-fonts/overpass/500Medium';
import { Overpass_700Bold } from '@expo-google-fonts/overpass/700Bold';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { I18nProvider } from '../i18n';
import { useReducedMotion } from '../theme/motion';

export default function RootLayout() {
  const reduced = useReducedMotion();
  const [fontsLoaded] = useFonts({
    NotoSansSinhala_400Regular, NotoSansSinhala_700Bold,
    NotoSansTamil_400Regular, NotoSansTamil_700Bold,
    FiraSans_900Black,
    FiraSans_700Bold,
    Overpass_400Regular,
    Overpass_500Medium,
    Overpass_700Bold,
  });

  // Note: we render before the fonts resolve on purpose. Blocking here would leave the
  // static web export with an empty <body> (no content, no meta tags) for crawlers.
  void fontsLoaded;

  return (
    <I18nProvider>
      <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: reduced ? 'none' : 'fade',
            animationDuration: 180,
          }}
        />
      </SafeAreaView>
      </SafeAreaProvider>
    </I18nProvider>
  );
}
