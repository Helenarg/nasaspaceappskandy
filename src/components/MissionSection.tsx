import { useViewport } from '../theme/useViewport';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import { ArrowRight, Globe, Users, Sparkles } from './icons';
import ActionLink from './ActionLink';
import Reveal from './Reveal';
import SpaceScene from './SpaceScene';

const FEATURES = [
  { number: '01', title: 'Open data. Open minds.', description: 'Explore real challenges with NASA’s freely available science and Earth observation data.', Icon: Globe },
  { number: '02', title: 'Different perspectives.', description: 'Coders, designers, scientists, storytellers. Great ideas need more than one kind of thinker.', Icon: Users },
  { number: '03', title: 'Build something meaningful.', description: 'Find a team, test an idea, and turn your curiosity into a solution you can share with the world.', Icon: Sparkles },
];
export default function MissionSection() {
  const { width } = useViewport();
  return <View style={layout.section(width)}>
    <Reveal><View style={[styles.headingRow, { flexDirection: width < 900 ? 'column' : 'row' }]}>
      <View style={styles.heading}><Text style={styles.eyebrow}>02 / EVERY GREAT DISCOVERY STARTS WITH A QUESTION</Text>
        <Text accessibilityRole="header" aria-level={2} style={[styles.title, { fontSize: width < 600 ? 36 : 48, lineHeight: width < 600 ? 42 : 54 }]}>What if your idea{ '\n' }could change our world?</Text>
      </View><Text style={styles.intro}>Space Apps brings people together to solve challenges on Earth and in space. You don’t need to be a space expert. Bring your curiosity. We’ll explore together.</Text>
    </View></Reveal>
    <View style={[styles.features, { flexDirection: width < 800 ? 'column' : 'row' }]}>
      {FEATURES.map(({ number, title, description, Icon }, index) => <Reveal delay={index * 80} key={number} style={styles.feature} testID="feature-card">
        <View style={styles.cardTop}><Text style={styles.number}>/ {number}</Text><Icon size={24} color={colors.primary} /></View>
        <Text style={styles.featureTitle}>{title}</Text><Text style={styles.featureDescription}>{description}</Text>
      </Reveal>)}
    </View>
    <Reveal><SpaceScene source={require('../../assets/space/cosmic-cliffs.png')} style={styles.image}>
      <View style={styles.imageShade} /><View style={[styles.imageContent, { padding: width < 600 ? 24 : 40 }]}>
        <Text style={styles.eyebrow}>LOOK BEYOND THE FAMILIAR</Text><Text style={[styles.imageTitle, { fontSize: width < 600 ? 30 : 42 }]}>The next frontier{ '\n' }starts with you.</Text>
        <View style={styles.imageAction}><ActionLink href="/about" label="DISCOVER THE MISSION" secondary /></View>
        <Text style={styles.credit}>WEBB’S COSMIC CLIFFS · NASA, ESA, CSA, STScI</Text>
      </View>
    </SpaceScene></Reveal>
    <View style={styles.paths}>
      <Text style={styles.eyebrow}>FIND YOUR PLACE IN THE MISSION</Text>
      {[['Make your mark', 'Join the hackathon', '/register'], ['Share what you know', 'Volunteer or mentor', '/join'], ['Build the community', 'Become an ambassador', '/ambassadors']].map(([title, subtitle, href]) =>
        <View key={href} style={[styles.path, { flexDirection: width < 600 ? 'column' : 'row' }]}>
          <Text style={styles.pathTitle}>{title}</Text><ActionLink href={href as '/register' | '/join' | '/ambassadors'} label={subtitle.toUpperCase()} secondary />
        </View>)}
      <View style={styles.pathCaption}><ArrowRight size={16} color={colors.primary} /><Text style={styles.featureDescription}>Your skills. Your perspective. Your community.</Text></View>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  headingRow: { gap: 40, alignItems: 'flex-start', marginBottom: 40 },
  heading: { flex: 1.5 },
  eyebrow: { color: colors.primary, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.2, marginBottom: 24, lineHeight: 20 },
  title: { color: colors.text, fontFamily: fonts.display, letterSpacing: -1.2 },
  intro: { flex: 1, fontFamily: fonts.body, color: colors.textMuted, fontSize: 18, lineHeight: 30 },
  features: { gap: 24, marginBottom: 56 },
  feature: { flex: 1, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 28, paddingBottom: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  number: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 11 },
  featureTitle: { fontFamily: fonts.heading, color: colors.text, fontSize: 23, lineHeight: 30, marginBottom: 16 },
  featureDescription: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 16, lineHeight: 26 },
  image: { minHeight: 400, borderRadius: 8, overflow: 'hidden', justifyContent: 'flex-end', backgroundColor: colors.background },
  imageShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(7,23,63,0.65)' },
  imageContent: { maxWidth: 650 },
  imageTitle: { fontFamily: fonts.display, color: colors.text, lineHeight: 48, letterSpacing: -1 },
  imageAction: { alignSelf: 'flex-start', marginTop: 28 },
  credit: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 9, letterSpacing: 1, marginTop: 32 },
  paths: { marginTop: 56 },
  path: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 28, gap: 24, justifyContent: 'space-between', alignItems: 'flex-start' },
  pathTitle: { fontFamily: fonts.heading, color: colors.text, fontSize: 28 },
  pathCaption: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
});
