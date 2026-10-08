import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Animated, Easing } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { USE_NATIVE_DRIVER, useReducedMotion } from '../theme/motion';
import { CheckCircle2, User, Shield } from '../components/icons';
import { Ionicons } from '@expo/vector-icons';


const COMMITTEE_MEMBERS = [
  { name: 'Sandaruwan Perera', role: 'LEAD ORGANIZER', affiliation: 'Kandy Local Core', highlight: true },
  { name: 'Chamindu Herath', role: 'TECHNICAL LEAD', affiliation: 'Systems & NASA APIs', highlight: false },
  { name: 'Tharushi Silva', role: 'COMMUNICATIONS DIRECTOR', affiliation: 'Media & Outreach', highlight: false },
  { name: 'Dilantha Bandara', role: 'OUTREACH MANAGER', affiliation: 'Provincial Expansion', highlight: false },
];

export default function AboutPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);
  const reducedMotion = useReducedMotion();

  const [rotateAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (reducedMotion) return;

    const loops = [
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: USE_NATIVE_DRIVER,
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
        ])
      ),
    ];

    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [rotateAnim, pulseAnim, reducedMotion]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <PageShell style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PageMeta
        title="About | NASA Space Apps Sri Lanka"
        description="The organising committee, the Kandy hub, and the national roadmap behind NASA Space Apps Challenge Sri Lanka."
        path="/about"
      />
      <Navbar />

      {/* Hero Section */}
      <PageHeader number="01" eyebrow="THE MISSION" title={"A local spark.\nA global mission."} description="Meet the community behind NASA Space Apps Kandy and our vision for a more connected, curious Sri Lanka." />

      {/* Strategic Vision Section (2-Column) */}
      <View style={styles.visionSection}>
        {/* Left Column: Satellite Telemetry Simulation Graphic */}
        <View style={styles.visionGraphicContainer}>
          <View style={styles.telemetryBox}>
            <View style={styles.telemetryTopBar}>
              <View style={styles.telemetryStatusGroup}>
                <View style={styles.liveGreenDot} />
                <Text style={styles.telemetryTag}>ORBITAL TELEMETRY • SIMULATION</Text>
              </View>
              <Text style={styles.telemetryCoords}>KANDY_RADAR_01</Text>
            </View>

            {/* Radar Scope */}
            <View style={styles.radarContainer}>
              <View style={styles.radarOuterCircle} />
              <View style={styles.radarMidCircle} />
              <View style={styles.radarInnerCircle} />

              <View style={styles.radarGridH} />
              <View style={styles.radarGridV} />

              <Animated.View style={[styles.rotatingSweep, { transform: [{ rotate: spin }] }]}>
                <View style={styles.sweepLine} />
              </Animated.View>

              {/* Pulsing Target Dot */}
              <Animated.View style={[styles.targetDot, { transform: [{ scale: pulseAnim }] }]} />
              <View style={[styles.satelliteEcho, { top: 35, right: 45 }]} />
              <View style={[styles.satelliteEcho, { bottom: 45, left: 35, backgroundColor: colors.secondary }]} />
            </View>

            {/* Telemetry Metrics Footer */}
            <View style={styles.telemetryFooter}>
              <View style={styles.telemetryStat}>
                <Text style={styles.telemetryLabel}>SIGNAL QUALITY</Text>
                <Text style={styles.telemetryValue}>99.4% NOMINAL</Text>
              </View>
              <View style={styles.telemetryStat}>
                <Text style={styles.telemetryLabel}>OPEN DATA SYNC</Text>
                <Text style={[styles.telemetryValue, { color: colors.primary }]}>ACTIVE</Text>
              </View>
              <View style={styles.telemetryStat}>
                <Text style={styles.telemetryLabel}>PROVINCIAL NODES</Text>
                <Text style={[styles.telemetryValue, { color: colors.secondary }]}>9 CONNECTED</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Right Column: Strategic Roadmap Text */}
        <View style={styles.visionContent}>
          <Text style={styles.visionTitle}>
            Strategic Vision for{'\n'}
            <Text style={styles.visionTitleCyan}>.lk Domain</Text> Dominance
          </Text>
          <View style={styles.coralDivider} />

          <Text style={styles.visionDescription}>
            Our mission is to establish Sri Lanka as a recognized regional incubator in space-tech innovation. By leveraging NASA&apos;s Open Data archives, we empower youth to build scalable technologies addressing both terrestrial and planetary challenges.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.iconCircle}>
                <CheckCircle2 color={colors.primary} size={20} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Kandy as Central Innovation Hub</Text>
                <Text style={styles.featureDesc}>
                  Anchoring core technical infrastructure, mentorship tracks, and international partnerships from the cultural and scientific heart of Sri Lanka.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.iconCircle}>
                <CheckCircle2 color={colors.primary} size={20} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>9-Province Network Connectivity</Text>
                <Text style={styles.featureDesc}>
                  Expanding participation from schools, technical colleges, and universities across Northern, Western, Southern, and Eastern provinces.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.iconCircle}>
                <CheckCircle2 color={colors.secondary} size={20} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>UNESCO-Grade Technical Leadership</Text>
                <Text style={styles.featureDesc}>
                  Upholding rigorous international judging rubrics and direct evaluation standards aligned with NASA Headquarters criteria.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Organizing Committee Grid */}
      <View style={styles.committeeSection}>
        <View style={styles.badge}>
          <Shield size={14} color={colors.primary} />
          <Text style={styles.badgeText}>GOVERNANCE & LEADERSHIP</Text>
        </View>

        <Text style={styles.committeeTitle}>
          MEET OUR <Text style={styles.heroTitleCyan}>ORGANIZING COMMITTEE</Text>
        </Text>
        <Text style={styles.committeeSubtitle}>
          THE VISIONARIES BEHIND SRI LANKA&apos;S SPACE-TECH MOVEMENT
        </Text>

        <View style={styles.gridContainer}>
          {COMMITTEE_MEMBERS.map((person, index) => (
            <View key={index} style={[styles.card, person.highlight && styles.cardHighlight]}>
              <View style={styles.avatar}>
                <User color={colors.textMuted} size={36} />
              </View>
              <Text style={styles.cardName}>{person.name}</Text>
              <Text style={styles.cardRole}>{person.role}</Text>
              <Text style={styles.cardAffiliation}>{person.affiliation}</Text>

              <Pressable
                accessibilityRole="button"
                style={styles.linkedinBtn}
                accessibilityLabel={`${person.name}'s LinkedIn Profile`}
              >
                <Ionicons name="logo-linkedin" size={16} color={colors.primary} />
              </Pressable>
            </View>
          ))}
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2
  },
  heroTitleCyan: {
    color: colors.primary
  },
  visionSection: {
    ...layout.section(width),
    flexDirection: width > 900 ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.gap(width)
  },
  visionGraphicContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  telemetryBox: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    padding: 24
  },
  telemetryTopBar: {
    flexDirection: width < 600 ? 'column' : 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: width < 600 ? 'flex-start' : 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 12
  },
  telemetryStatusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981'
  },
  telemetryTag: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  telemetryCoords: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  radarContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignSelf: 'center',
    marginVertical: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7, 23, 63, 0.6)'
  },
  radarOuterCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.2)'
  },
  radarMidCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(234, 254, 7, 0.25)'
  },
  radarInnerCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.35)'
  },
  radarGridH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(234, 254, 7, 0.1)'
  },
  radarGridV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(234, 254, 7, 0.1)'
  },
  rotatingSweep: {
    position: 'absolute',
    width: 240,
    height: 240,
    alignItems: 'center'
  },
  sweepLine: {
    width: 2,
    height: 120,
    backgroundColor: 'rgba(234, 254, 7, 0.5)'
  },
  targetDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary
  },
  satelliteEcho: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },
  telemetryFooter: {
    flexDirection: width < 600 ? 'column' : 'row',
    gap: 20,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 14
  },
  telemetryStat: {
    flex: 1,
    alignItems: width < 600 ? 'flex-start' : 'center'
  },
  telemetryLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4
  },
  telemetryValue: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.5
  },
  visionContent: {
    flex: 1
  },
  visionTitle: {
    fontSize: width > 768 ? 38 : 28,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    lineHeight: width > 768 ? 46 : 36
  },
  visionTitleCyan: {
    color: colors.primary
  },
  coralDivider: {
    width: 50,
    height: 3,
    backgroundColor: colors.secondary,
    marginVertical: 18,
    borderRadius: 2
  },
  visionDescription: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 28
  },
  featureList: {
    gap: 18
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14
  },
  iconCircle: {
    marginTop: 2
  },
  featureTextContainer: {
    flex: 1
  },
  featureTitle: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4
  },
  featureDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  committeeSection: {
    ...layout.section(width),
    alignItems: 'center',
    gap: layout.gap(width)
  },
  committeeTitle: {
    fontSize: 30,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.5
  },
  committeeSubtitle: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 10,
    marginBottom: 45,
    textAlign: 'center',
    fontWeight: '700'
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    maxWidth: 1200,
    width: '100%'
  },
  card: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width),
    width: width > 900 ? 260 : width > 600 ? '45%' : '100%',
    alignItems: 'center'
  },
  cardHighlight: {
    borderColor: 'rgba(234, 254, 7, 0.35)'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)'
  },
  cardName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 4,
    textAlign: 'center'
  },
  cardRole: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 4,
    textAlign: 'center'
  },
  cardAffiliation: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 18,
    textAlign: 'center'
  },
  linkedinBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
