import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/LocalizedText';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActionLink from '../components/ActionLink';
import Reveal from '../components/Reveal';
import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { SPACE_APPS_EVENT } from '../content/event';

export default function AboutPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);
  return <PageShell>
    <PageMeta title="About | NASA Space Apps Kandy" description="Understand the Space Apps mission and the local Kandy community's plans." path="/about" />
    <Navbar />
    <PageHeader number="01" eyebrow="THE MISSION" title={"A local spark.\nA global mission."} description="Meet the community behind NASA Space Apps Kandy and our vision for a more connected, curious Sri Lanka." />
    <Reveal style={styles.section} distance={24} duration={650}>
      <View style={styles.grid}>
        <View style={styles.card}><Text style={styles.label}>THE GLOBAL CHALLENGE</Text><Text style={styles.title}>Curiosity brings us together.</Text>
          <Text style={styles.body}>NASA Space Apps brings people together to explore challenges using open data. Coding is one way to contribute: storytelling, design, research and scientific thinking also help a team build its project.</Text>
          <Text style={styles.value}>{SPACE_APPS_EVENT.dateLabel}</Text>
          <ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL EVENT WEBSITE" />
        </View>
        <View style={styles.card}><Text style={styles.label}>THE LOCAL COMMUNITY</Text><Text style={styles.title}>Build a welcoming Kandy hub.</Text>
          <Text style={styles.body}>This site shares local interest opportunities and aims to connect curious people in Sri Lanka. Local venue, programme and organizer details will be published when confirmed.</Text>
          <Text style={styles.body}>Partnerships, mentors and committee profiles are not yet announced. Contact the local team for current information before making travel or participation arrangements.</Text>
          <ActionLink href="/contact" label="LOCAL EVENT QUESTIONS" secondary />
        </View>
      </View>
    </Reveal>
    <View style={styles.section}><View style={styles.card}><Text style={styles.title}>Your first steps</Text>
      <Text style={styles.body}>1. Visit the official Space Apps website and follow its account and event registration instructions.</Text>
      <Text style={styles.body}>2. Browse the official challenges, find teammates and choose a problem together.</Text>
      <Text style={styles.body}>3. Use this local site to express interest or ask about Kandy logistics. A local interest receipt does not complete official registration.</Text>
      <ActionLink href="/challenges" label="EXPLORE CHALLENGES" secondary />
    </View></View>
    <Footer />
  </PageShell>;
}

const makeStyles = (width: number) => StyleSheet.create({
  section: { ...layout.container(width), paddingBottom: layout.sectionSpace(width), gap: layout.gap(width) },
  grid: { flexDirection: width >= 1200 ? 'row' : 'column', gap: layout.gap(width), alignItems: 'stretch' },
  card: { flex: 1, minWidth: 0, padding: layout.cardPadding(width), backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 8, gap: 20 },
  title: { fontFamily: fonts.display, fontSize: width < 600 ? 24 : 30, lineHeight: width < 600 ? 32 : 39, color: colors.text },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 27, color: colors.textMuted },
  label: { fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 21, letterSpacing: 1, color: colors.primary },
  value: { fontFamily: fonts.bodyBold, fontSize: 20, lineHeight: 29, color: colors.text },
  actions: { gap: 16, alignSelf: width >= 900 ? 'flex-start' : 'stretch' },
});
