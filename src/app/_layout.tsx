import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  FiraSans_900Black,
  FiraSans_700Bold,
} from '@expo-google-fonts/fira-sans';
import {
  Overpass_400Regular,
  Overpass_500Medium,
  Overpass_700Bold,
} from '@expo-google-fonts/overpass';
import { colors } from '../theme/colors';
import { I18nProvider } from '../i18n';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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
            animation: 'fade',
            animationDuration: 180,
          }}
        />
      </SafeAreaView>
      </SafeAreaProvider>
    </I18nProvider>
  );
}
