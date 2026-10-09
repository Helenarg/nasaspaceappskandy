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

export default function SponsorsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);
  return <PageShell>
    <PageMeta title="Partnerships | NASA Space Apps Kandy" description="Discuss ways to support local participation in NASA Space Apps Kandy." path="/sponsors" />
    <Navbar />
    <PageHeader number="08" eyebrow="PARTNERS & SPONSORS" title={"Back curiosity.\nBuild possibility."} description="Help create opportunities for people to collaborate, learn, and turn open science into useful ideas." />
    <Reveal style={styles.section} distance={24} duration={650}><View style={styles.card}>
      <Text style={styles.label}>PARTNERSHIP ENQUIRIES OPEN</Text><Text style={styles.title}>Support the local community.</Text>
      <Text style={styles.body}>Confirmed sponsors and partnership packages have not yet been published. Contact the local team to discuss possible support, availability and written terms.</Text>
      <Text style={styles.body}>No sponsorship tier, NASA endorsement, attendee reach or branding placement is guaranteed by this page.</Text>
      <ActionLink href="/contact" label="DISCUSS PARTNERSHIP" />
    </View></Reveal>
    <View style={styles.section}><View style={styles.grid}>
      <View style={styles.card}><Text style={styles.title}>Tools and learning</Text><Text style={styles.body}>Explore ways to help participants access learning resources, equipment or mentoring. Any programme will be confirmed with the organizing team.</Text></View>
      <View style={styles.card}><Text style={styles.title}>Inclusive participation</Text><Text style={styles.body}>Discuss support that makes local participation easier, such as accessible spaces or practical event needs. Scope and arrangements remain subject to confirmation.</Text></View>
      <View style={styles.card}><Text style={styles.title}>Community connections</Text><Text style={styles.body}>Introduce your school, university, business or community group to the local team. We welcome a conversation about shared goals.</Text></View>
    </View></View>
    <View style={styles.section}><View style={styles.card}><Text style={styles.title}>Request current information</Text><Text style={styles.body}>A sponsorship prospectus is not available for download yet. Ask the team about current opportunities and request confirmed details directly.</Text><ActionLink href="/contact" label="CONTACT THE TEAM" secondary /></View></View>
    <Footer />
  </PageShell>;
}

const makeStyles = (width: number) => StyleSheet.create({
  section: { ...layout.container(width), paddingBottom: layout.sectionSpace(width), gap: layout.gap(width) },
  grid: { flexDirection: width >= 900 ? 'row' : 'column', gap: layout.gap(width), alignItems: 'stretch' },
  card: { flex: 1, minWidth: 0, padding: layout.cardPadding(width), backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 8, gap: 20 },
  title: { fontFamily: fonts.display, fontSize: width < 600 ? 24 : 30, lineHeight: width < 600 ? 32 : 39, color: colors.text },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 27, color: colors.textMuted },
  label: { fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 21, letterSpacing: 1, color: colors.primary },
  value: { fontFamily: fonts.bodyBold, fontSize: 20, lineHeight: 29, color: colors.text },
  actions: { gap: 16, alignSelf: width >= 900 ? 'flex-start' : 'stretch' },
});
