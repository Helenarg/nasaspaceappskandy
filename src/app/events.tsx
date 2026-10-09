import { useEffect, useMemo, useState } from 'react';
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
import { SPACE_APPS_EVENT, getEventCountdown } from '../content/event';


export default function EventsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);
  const [countdown, setCountdown] = useState<ReturnType<typeof getEventCountdown> | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const next = getEventCountdown();
      setCountdown(next);
      if (next.status === 'upcoming') timer = setTimeout(update, 1000);
      else if (next.status === 'live') timer = setTimeout(update, Math.max(1, Date.parse(SPACE_APPS_EVENT.end) - Date.now()));
    };
    update();
    return () => clearTimeout(timer);
  }, []);
  return <PageShell>
    <PageMeta title="Events & Preparation | NASA Space Apps Kandy" description="Confirmed global event dates, local schedule status and preparation resources." path="/events" />
    <Navbar />
    <PageHeader number="02" eyebrow="EVENTS & WORKSHOPS" title={"Make time\nfor discovery."} description="Check the global event dates and local schedule status, then prepare for a weekend of collaboration." />
    <Reveal style={styles.section} distance={24} duration={650}><View style={styles.grid}>
      <View style={styles.card}><Text style={styles.label}>GLOBAL HACKATHON</Text><Text style={styles.title}>NASA Space Apps 2026</Text><Text style={styles.value}>{SPACE_APPS_EVENT.dateLabel}</Text>
        <Text style={styles.body}>These are the confirmed global calendar dates. Local kickoff times, venue and programme are still to be announced.</Text>
        <ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL EVENT WEBSITE" />
      </View>
      <View style={styles.card}><Text style={styles.label}>{countdown?.status === 'live' ? 'GLOBAL EVENT WEEKEND' : countdown?.status === 'ended' ? 'GLOBAL EVENT ENDED' : 'UNTIL THE GLOBAL EVENT WEEKEND'}</Text>
        {countdown?.status === 'upcoming' && <View style={styles.countdownGrid}>
          {([['DAYS', countdown.days], ['HOURS', countdown.hours], ['MINS', countdown.minutes], ['SECS', countdown.seconds]] as const).map(([label, value]) => <View key={label} style={styles.countdownItem}><Text style={styles.countdownNumber}>{String(value).padStart(2, '0')}</Text><Text style={styles.label}>{label}</Text></View>)}
        </View>}
        {countdown?.status === 'live' && <Text style={styles.title}>The global event weekend is here.</Text>}
        {countdown?.status === 'ended' && <Text style={styles.title}>The global event weekend has ended.</Text>}
        <Text style={styles.body}>Countdown uses midnight on November 14 in Sri Lanka (UTC+5:30). This is a calendar reference, not a confirmed Kandy opening time.</Text>
      </View>
    </View></Reveal>
    <View style={styles.section}><View style={styles.card}><Text style={styles.label}>KANDY LOGISTICS</Text><Text style={styles.title}>{SPACE_APPS_EVENT.localSchedule}</Text><Text style={styles.value}>{SPACE_APPS_EVENT.localVenue}</Text>
      <Text style={styles.body}>Please wait for confirmed local venue, accessibility arrangements, workshop dates and submission milestones before planning your visit. This page does not reserve a workshop seat.</Text>
      <ActionLink href="/contact" label="ASK ABOUT WORKSHOPS" secondary />
    </View></View>
    <View style={styles.section}><Text style={styles.title}>Prepare at your own pace.</Text><View style={styles.grid}>
      <View style={styles.card}><Text style={styles.label}>01 / EXPLORE</Text><Text style={styles.title}>Find a question.</Text><Text style={styles.body}>Read the official challenges and resources. Write down what interests you and what you would like to learn.</Text><ActionLink href="/challenges" label="EXPLORE CHALLENGES" secondary /></View>
      <View style={styles.card}><Text style={styles.label}>02 / CONNECT</Text><Text style={styles.title}>Build a team.</Text><Text style={styles.body}>Look for complementary interests and skills. Follow official event instructions for team formation and project submission.</Text><ActionLink href={SPACE_APPS_EVENT.officialUrl} label="OFFICIAL PARTICIPATION STEPS" secondary /></View>
      <View style={styles.card}><Text style={styles.label}>03 / ASK</Text><Text style={styles.title}>Check local details.</Text><Text style={styles.body}>Tell the local team what support you need and ask about arrangements before attending. Local interest is separate from official registration.</Text><ActionLink href="/contact" label="LOCAL EVENT QUESTIONS" secondary /></View>
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
  countdownGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  countdownItem: { flexGrow: 1, minWidth: 70, padding: 12, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: colors.border, borderRadius: 8 },
  countdownNumber: { fontFamily: fonts.display, fontSize: 32, color: colors.primary },
});
