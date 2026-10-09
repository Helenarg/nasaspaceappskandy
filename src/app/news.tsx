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

export default function NewsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);
  return <PageShell>
    <PageMeta title="News & Media | NASA Space Apps Kandy" description="Official Space Apps updates and local publication status for Kandy." path="/news" />
    <Navbar />
    <PageHeader number="07" eyebrow="NEWS & MEDIA" title={"Stories from\nour community."} description="Follow the journey, explore our latest updates, and find resources for sharing the Space Apps story." />
    <Reveal style={styles.section} distance={24} duration={650}><View style={styles.grid}>
      <View style={styles.card}><Text style={styles.label}>OFFICIAL GLOBAL INFORMATION</Text><Text style={styles.title}>Space Apps 2026</Text><Text style={styles.value}>{SPACE_APPS_EVENT.dateLabel}</Text>
        <Text style={styles.body}>Find the official event announcement, participation instructions and current challenge information on the global Space Apps website.</Text>
        <ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL EVENT WEBSITE" />
      </View>
      <View style={styles.card}><Text style={styles.label}>LOCAL UPDATES PENDING</Text><Text style={styles.title}>Kandy news</Text><Text style={styles.body}>There are no verified local press releases published here yet. Confirmed announcements will include a publication date, source and complete statement.</Text>
        <ActionLink href="/contact" label="CONTACT THE TEAM" secondary />
      </View>
    </View></Reveal>
    <View style={styles.section}><View style={styles.card}><Text style={styles.label}>MEDIA ENQUIRIES</Text><Text style={styles.title}>Share accurate information.</Text>
      <Text style={styles.body}>A local media package is not available for download yet. Contact the team to request verified local facts, approved images or a spokesperson. Consult the official Space Apps website for its current brand resources and usage guidance.</Text>
      <View style={styles.actions}><ActionLink href="/contact" label="REQUEST MEDIA INFORMATION" /><ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL SPACE APPS RESOURCES" secondary /></View>
    </View></View>
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
