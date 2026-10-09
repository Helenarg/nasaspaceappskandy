import { Pressable } from '../components/LocalizedPressable';
import { useMemo, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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

import FormField from '../components/FormField';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';

// Local learning prompts, not official NASA challenge titles or requirements.
const PRACTICE_IDEAS = [
  { id: 1, title: 'Tell a story with Earth imagery', category: 'EARTH', description: 'Choose a place you know and explore publicly available satellite images. Explain what you can observe and what the imagery cannot prove.', steps: 'Start with one place and one question. Record the image source and date, compare observations, and tell a clear story without claiming that an image establishes cause.' },
  { id: 2, title: 'Visualize a space journey', category: 'SPACE', description: 'Create a simple illustration or interactive story that helps a beginner understand a space mission.', steps: 'Choose a published mission, collect its verified milestones, credit your sources and build a small prototype. Clearly label simplifications and assumptions.' },
  { id: 3, title: 'Make open data easier to understand', category: 'OPEN DATA', description: 'Turn a small public dataset into an accessible chart or explanation for a nontechnical audience.', steps: 'Read the dataset documentation, check units and missing values, choose one useful chart and explain the limitations. Ask a friend to interpret your result.' },
];
const FILTERS = ['ALL', 'EARTH', 'SPACE', 'OPEN DATA'];

export default function ChallengesPage() {
  const { width } = useViewport();
  const { lang } = useI18n();
  const styles = useMemo(() => makeStyles(width), [width]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [expanded, setExpanded] = useState<number | null>(null);
  const normalized = query.trim().toLocaleLowerCase();
  const ideas = PRACTICE_IDEAS.filter(idea => (filter === 'ALL' || idea.category === filter) && [idea.title, idea.description, idea.category].some(value => (value + ' ' + translateCopy(value, lang)).toLocaleLowerCase().includes(normalized)));
  return <PageShell keyboardShouldPersistTaps="handled">
    <PageMeta title="Challenges & Resources | NASA Space Apps Kandy" description="Find the official Space Apps challenges and explore clearly labeled local practice ideas." path="/challenges" />
    <Navbar />
    <PageHeader number="03" eyebrow="CHALLENGES & RESOURCES" title={"Big questions.\nBold possibilities."} description="Find a challenge that speaks to your curiosity. Explore Earth, space, and the possibilities of open science." />
    <Reveal style={styles.section} distance={24} duration={650}><View style={styles.card}>
      <Text style={styles.label}>OFFICIAL 2026 CHALLENGES</Text><Text style={styles.title}>Start with the official source.</Text>
      <Text style={styles.body}>Use the global Space Apps website to read the current challenge descriptions, rules, resources and submission instructions. The practice ideas below are local learning prompts and are not official competition briefs.</Text>
      <ActionLink href={SPACE_APPS_EVENT.challengesUrl} label="EXPLORE OFFICIAL CHALLENGES" />
    </View></Reveal>
    <View style={styles.section}>
      <Text style={styles.title}>Local practice ideas</Text><Text style={styles.body}>Optional activities to build confidence before the event. They do not replace the official challenge requirements.</Text>
      <Text style={styles.body}>Practice is for learning. Follow the official rules for when competition project work may begin; do not submit a prebuilt practice project as your hackathon entry.</Text>
      <FormField label="Search practice ideas" value={query} onChangeText={setQuery} placeholder="Search by keyword" />
      <View accessibilityLabel="Practice idea categories" style={styles.filters}>
        {FILTERS.map(value => <Pressable key={value} accessibilityRole="button" accessibilityLabel={translateCopy(value, lang)} accessibilityState={{ selected: filter === value }} {...(Platform.OS === 'web' ? { 'aria-pressed': filter === value } : {})} onPress={() => setFilter(value)} style={[styles.filter, filter === value && styles.filterActive]}><Text style={styles.filterLabel}>{value}</Text></Pressable>)}
      </View>
      {ideas.length === 0 && <View style={styles.card}><Text style={styles.title}>No practice ideas found.</Text><Text style={styles.body}>Try another keyword or reset the search and category.</Text><Pressable accessibilityRole="button" onPress={() => { setQuery(''); setFilter('ALL'); }} style={styles.filter}><Text style={styles.filterLabel}>RESET SEARCH</Text></Pressable></View>}
      <View style={styles.grid}>{ideas.map(idea => <View key={idea.id} style={styles.card}>
        <Text style={styles.label}>LOCAL PRACTICE / {idea.category}</Text><Text style={styles.title}>{idea.title}</Text><Text style={styles.body}>{idea.description}</Text>
        <Pressable accessibilityRole="button" accessibilityState={{ expanded: expanded === idea.id }} onPress={() => setExpanded(expanded === idea.id ? null : idea.id)} style={styles.filter}><Text style={styles.filterLabel}>{expanded === idea.id ? 'HIDE PRACTICE NOTES' : 'VIEW PRACTICE NOTES'}</Text></Pressable>
        {expanded === idea.id && <Text style={styles.body}>{idea.steps}</Text>}
      </View>)}</View>
    </View>
    <View style={styles.section}><View style={styles.grid}>
      <View style={styles.card}><Text style={styles.title}>NASA open data</Text><Text style={styles.body}>Explore NASA datasets and read the documentation for any data you plan to use. Access and tools vary by dataset.</Text><ActionLink href="https://data.nasa.gov/" label="VIEW NASA OPEN DATA" secondary /></View>
      <View style={styles.card}><Text style={styles.title}>Participant resources</Text><Text style={styles.body}>Local toolkits and pitch templates are not available for download yet. Follow the official Space Apps guidance and ask the local team for current support.</Text><ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL SPACE APPS RESOURCES" secondary /><ActionLink href="/contact" label="CONTACT THE TEAM" secondary /></View>
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
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  filter: { minHeight: 48, paddingVertical: 14, paddingHorizontal: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 4 },
  filterActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  filterLabel: { fontFamily: fonts.bodyBold, fontSize: 14, lineHeight: 21, color: colors.text },
});
