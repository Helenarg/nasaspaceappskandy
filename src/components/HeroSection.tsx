import { useViewport } from '../theme/useViewport';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import { useI18n } from '../i18n';
import ActionLink from './ActionLink';
import GridBackground from './GridBackground';
import Reveal from './Reveal';

export default function HeroSection() {
  const { width } = useViewport();
  const { t } = useI18n();
  return <ImageBackground source={require('../../assets/space/earth-horizon.jpg')} resizeMode="cover" imageStyle={{ width: '100%', height: '100%' }} style={styles.hero}>
    <View style={styles.shade} /><GridBackground />
    <View style={[layout.container(width), { paddingTop: width < 600 ? 72 : 112, paddingBottom: width < 600 ? 56 : 72 }]}>
      <Reveal><View style={styles.eyebrowRow}><View style={styles.marker} /><Text style={styles.eyebrow}>NASA SPACE APPS CHALLENGE · KANDY 2026</Text></View>
        <Text accessibilityRole="header" aria-level={1} style={[styles.title, { fontSize: width < 600 ? 48 : width < 1000 ? 72 : 88,
          lineHeight: width < 600 ? 52 : width < 1000 ? 78 : 94 }]}>
          A world of ideas.{ '\n' }<Text style={styles.highlight}>A universe of{ '\n' }possibilities.</Text>
        </Text>
        <Text style={styles.description}>Your curiosity belongs here. Join Sri Lanka’s community of makers, thinkers, and explorers to build solutions for Earth and space using NASA’s open data.</Text>
        <View style={[styles.buttons, { flexDirection: width < 600 ? 'column' : 'row' }]}>
          <ActionLink href="/register" label={t('hero.cta.primary')} />
          <ActionLink href="/challenges" label={t('hero.cta.secondary')} secondary />
        </View>
      </Reveal>
      <View style={[styles.bottom, { flexDirection: width < 600 ? 'column' : 'row' }]}>
        <Text style={styles.bottomText}>01 / EXPLORE. COLLABORATE. CREATE.</Text>
        <Text style={styles.credit}>EARTH FROM THE INTERNATIONAL SPACE STATION · NASA</Text>
      </View>
    </View>
  </ImageBackground>;
}
const styles = StyleSheet.create({
  hero: { backgroundColor: colors.background, overflow: 'hidden' },
  shade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(7,23,63,0.73)' },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32 },
  marker: { height: 8, width: 8, backgroundColor: colors.primary },
  eyebrow: { color: colors.text, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, flexShrink: 1 },
  title: { color: colors.text, fontFamily: fonts.display, letterSpacing: -2.2, maxWidth: 1000 },
  highlight: { color: colors.primary },
  description: { fontFamily: fonts.body, color: colors.text, fontSize: 18, lineHeight: 29, maxWidth: 560, marginTop: 32 },
  buttons: { gap: 16, marginTop: 36, alignItems: 'stretch', alignSelf: 'flex-start' },
  bottom: { marginTop: 88, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.25)', paddingTop: 24, gap: 16, justifyContent: 'space-between' },
  bottomText: { fontFamily: fonts.bodyBold, color: colors.text, letterSpacing: 1.2, fontSize: 10 },
  credit: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 9, letterSpacing: 0.6, maxWidth: 300 },
});
