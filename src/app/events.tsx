import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { Calendar, MapPin, ArrowRight, Rocket, BrainCircuit, Trophy, Clock, User, CheckCircle2 } from '../components/icons';


const WORKSHOPS = [
  {
    id: 1,
    title: 'NASA Open Data API Masterclass',
    date: 'SEP 20, 2026 • 7:00 PM IST',
    speaker: 'Dr. Aruna Wickrama',
    role: 'Satellite Data Specialist',
    level: 'INTERMEDIATE',
    levelColor: colors.primary,
    desc: 'Hands-on guide to authenticating and fetching high-resolution Earth and astrophysics feeds.',
  },
  {
    id: 2,
    title: 'Climate Tech & Earth Observations',
    date: 'SEP 24, 2026 • 7:00 PM IST',
    speaker: 'Kavindi Jayawardena',
    role: 'Environmental Data Scientist',
    level: 'BEGINNER',
    levelColor: '#10B981',
    desc: 'Deep dive into Landsat, MODIS, and Sentinel data pipelines for local agricultural impact.',
  },
  {
    id: 3,
    title: 'AI/ML for Deep Space Classification',
    date: 'SEP 28, 2026 • 7:00 PM IST',
    speaker: 'Malik Gunaratne',
    role: 'Computer Vision Engineer',
    level: 'ADVANCED',
    levelColor: colors.secondary,
    desc: 'Using PyTorch and transfer learning to classify James Webb and Hubble astronomical captures.',
  },
];

export default function EventsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [registeredWorkshops, setRegisteredWorkshops] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target hackathon date: October 3, 2026
    const targetDate = new Date('2026-10-03T09:00:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleWorkshop = (id: number) => {
    setRegisteredWorkshops((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <PageShell style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PageMeta
        title="Event Hub & 48-Hour Schedule | NASA Space Apps Sri Lanka"
        description="Full schedule for NASA Space Apps Kandy 2026, live countdown, pre-event workshops and venue details."
        path="/events"
      />
      <Navbar />

      {/* Hero Section */}
      <PageHeader number="02" eyebrow="EVENTS & WORKSHOPS" title={"Make time\nfor discovery."} description="Explore the hackathon schedule, find a workshop, and prepare for a weekend of collaboration."><View style={styles.eventCard}>
          <View style={styles.eventCardContent}>
            {/* Left Details */}
            <View style={styles.eventCardLeft}>
              <View style={styles.pillRow}>
                <View style={[styles.pill, styles.pillCyan]}>
                  <Text style={styles.pillTextBlack}>GLOBAL HACKATHON</Text>
                </View>
                <View style={[styles.pill, styles.pillDark]}>
                  <Text style={styles.pillTextWhite}>KANDY HUB</Text>
                </View>
              </View>

              <Text style={styles.eventTitle}>
                NASA SPACE APPS{'\n'}
                CHALLENGE KANDY{'\n'}
                2026
              </Text>

              <View style={styles.eventInfoList}>
                <View style={styles.eventInfoItem}>
                  <View style={styles.iconBox}>
                    <Calendar color={colors.primary} size={18} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.infoLabel}>EVENT DATES</Text>
                    <Text style={styles.infoValue}>October 3–5, 2026</Text>
                  </View>
                </View>

                <View style={styles.eventInfoItem}>
                  <View style={styles.iconBox}>
                    <MapPin color={colors.secondary} size={18} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.infoLabel}>PRIMARY VENUE</Text>
                    <Text style={styles.infoValue}>Kandy Convention Center, Sri Lanka</Text>
                  </View>
                </View>
              </View>

              <Link href="/register" asChild>
                <Pressable accessibilityRole="link" style={styles.registerBtn}>
                  <Text style={styles.registerBtnText}>REGISTER FOR EVENT</Text>
                  <ArrowRight color="#050912" size={16} style={{ marginLeft: 8 }} />
                </Pressable>
              </Link>
            </View>

            {/* Right Countdown Panel */}
            <View style={styles.countdownPanel}>
              <Text style={styles.countdownTitle}>STARTS IN</Text>

              <View style={styles.countdownGrid}>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>
                    {String(timeLeft.days).padStart(2, '0')}
                  </Text>
                  <Text style={styles.countdownLabel}>DAYS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </Text>
                  <Text style={styles.countdownLabel}>HOURS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </Text>
                  <Text style={styles.countdownLabel}>MINS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </Text>
                  <Text style={styles.countdownLabel}>SECS</Text>
                </View>
              </View>

              <View style={styles.timezoneBadge}>
                <Clock size={12} color={colors.textMuted} />
                <Text style={styles.timezoneText}>SRI LANKA STANDARD TIME (UTC+5:30)</Text>
              </View>
            </View>
          </View>
        </View></PageHeader>

      {/* Interactive 48-Hour Milestone Timeline */}
      <View style={styles.timelineSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            48-HOUR HACKATHON <Text style={styles.heroTitleCyan}>TIMELINE</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Key milestones throughout the global innovation sprint
          </Text>
        </View>

        <View style={styles.timelineContainer}>
          <View style={styles.timelineTrack} />

          {/* Day 1 */}
          <View style={styles.timelineNodeRow}>
            <View style={styles.nodeBadge}>
              <Rocket size={18} color="#050912" />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.dayBadge}>DAY 1 • OCT 3</Text>
                <Text style={styles.timeText}>09:00 AM – 12:00 PM</Text>
              </View>
              <Text style={styles.timelineNodeTitle}>Kickoff & Opening Ceremony</Text>
              <Text style={styles.timelineNodeDesc}>
                Global NASA keynote streaming, local mentor briefing, team formation lock, and direct access to NASA Open Data platform APIs.
              </Text>
            </View>
          </View>

          {/* Day 2 */}
          <View style={styles.timelineNodeRow}>
            <View style={[styles.nodeBadge, { backgroundColor: colors.secondary }]}>
              <BrainCircuit size={18} color="#050912" />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={[styles.dayBadge, { color: colors.secondary, borderColor: colors.secondary }]}>
                  DAY 2 • OCT 4
                </Text>
                <Text style={styles.timeText}>10:00 AM – 06:00 PM</Text>
              </View>
              <Text style={styles.timelineNodeTitle}>NASA Data Workshops & Mentorship</Text>
              <Text style={styles.timelineNodeDesc}>
                Deep-dive breakout rooms with subject matter experts, data engineering workshops, code clinics, and prototype stress-testing.
              </Text>
            </View>
          </View>

          {/* Day 3 */}
          <View style={styles.timelineNodeRow}>
            <View style={[styles.nodeBadge, { backgroundColor: '#10B981' }]}>
              <Trophy size={18} color="#050912" />
            </View>
            <View style={styles.timelineCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={[styles.dayBadge, { color: '#10B981', borderColor: '#10B981' }]}>
                  DAY 3 • OCT 5
                </Text>
                <Text style={styles.timeText}>02:00 PM – 08:00 PM</Text>
              </View>
              <Text style={styles.timelineNodeTitle}>Final Pitching & Award Ceremony</Text>
              <Text style={styles.timelineNodeDesc}>
                3-minute live prototype demos before the UNESCO & NASA judging panel, local winner announcements, and Global Nominee certifications.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pre-Hackathon Workshops Grid */}
      <View style={styles.workshopsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            PRE-HACKATHON <Text style={styles.heroTitleCyan}>WORKSHOPS</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Level up your skills with official webinars led by veteran engineers
          </Text>
        </View>

        <View style={styles.workshopsGrid}>
          {WORKSHOPS.map((ws) => {
            const isReg = registeredWorkshops.includes(ws.id);
            return (
              <View key={ws.id} style={styles.workshopCard}>
                <View style={styles.workshopHeaderRow}>
                  <View style={[styles.levelBadge, { borderColor: ws.levelColor }]}>
                    <Text style={[styles.levelText, { color: ws.levelColor }]}>{ws.level}</Text>
                  </View>
                  <Text style={styles.workshopDate}>{ws.date}</Text>
                </View>

                <Text style={styles.workshopTitle}>{ws.title}</Text>
                <Text style={styles.workshopDesc}>{ws.desc}</Text>

                <View style={styles.speakerRow}>
                  <View style={styles.speakerAvatar}>
                    <User size={16} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.speakerName}>{ws.speaker}</Text>
                    <Text style={styles.speakerRole}>{ws.role}</Text>
                  </View>
                </View>

                <Pressable
                  accessibilityRole="button"
                  style={[styles.workshopBtn, isReg && styles.workshopBtnActive]}
                  onPress={() => toggleWorkshop(ws.id)}
                >
                  {isReg ? (
                    <>
                      <CheckCircle2 size={16} color="#050912" style={{ marginRight: 6 }} />
                      <Text style={styles.workshopBtnText}>REGISTERED</Text>
                    </>
                  ) : (
                    <Text style={styles.workshopBtnText}>REGISTER SESSION</Text>
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      <Footer />
    </PageShell>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    flexGrow: 1
  },
  heroTitleCyan: {
    color: colors.primary
  },
  eventCard: {
    width: '100%',
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  eventCardContent: {
    flexDirection: width > 900 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30
  },
  eventCardLeft: {
    flex: 1,
    width: '100%'
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  pillCyan: {
    backgroundColor: colors.primary
  },
  pillDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  pillTextBlack: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  pillTextWhite: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  eventTitle: {
    fontSize: width > 768 ? 36 : 26,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    lineHeight: width > 768 ? 44 : 34,
    marginBottom: 24,
    letterSpacing: -0.3
  },
  eventInfoList: {
    gap: 14,
    marginBottom: 28
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  infoValue: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700'
  },
  registerBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: width > 768 ? 'flex-start' : 'stretch'
  },
  registerBtnText: {
    color: colors.ink,
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 0.8
  },
  countdownPanel: {
    backgroundColor: 'rgba(7, 23, 63, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    minWidth: width > 768 ? 320 : '100%'
  },
  countdownTitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.5,
    marginBottom: 16
  },
  countdownGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  countdownItem: {
    backgroundColor: 'rgba(10, 15, 31, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 58
  },
  countdownNumber: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: fonts.display,
    marginBottom: 2
  },
  countdownLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  timezoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  timezoneText: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 0.5
  },
  timelineSection: {
    ...layout.section(width),
    gap: layout.gap(width)
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 45
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.3
  },
  sectionSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center'
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 24
  },
  timelineTrack: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 40,
    width: 2,
    backgroundColor: 'rgba(234, 254, 7, 0.3)'
  },
  timelineNodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    gap: 20
  },
  nodeBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  timelineCard: {
    flex: 1,
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8
  },
  dayBadge: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  timeText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600'
  },
  timelineNodeTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 6
  },
  timelineNodeDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 21
  },
  workshopsSection: {
    ...layout.section(width),
    gap: layout.gap(width)
  },
  workshopsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center'
  },
  workshopCard: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width),
    width: width > 1000 ? '31%' : width > 700 ? '47%' : '100%'
  },
  workshopHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  levelBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  levelText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  workshopDate: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600'
  },
  workshopTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 8,
    lineHeight: 24
  },
  workshopDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20
  },
  speakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)'
  },
  speakerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(234, 254, 7, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  speakerName: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 12,
    fontWeight: '700'
  },
  speakerRole: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 10
  },
  workshopBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10
  },
  workshopBtnActive: {
    backgroundColor: '#10B981'
  },
  workshopBtnText: {
    color: colors.ink,
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 12,
    letterSpacing: 0.8
  },
});
