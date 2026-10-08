import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, useWindowDimensions, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../theme/colors';
import FlagLK from './FlagLK';
import { fonts } from '../theme/typography';
import { Rocket, Sparkles, Orbit, Radio, Globe } from './icons';
import SriLankaShape from './SriLankaShape';
import { CITY_POINTS, MAP_VIEWBOX } from '../theme/sriLankaGeo';
import { USE_NATIVE_DRIVER, useReducedMotion } from '../theme/motion';
import { useI18n } from '../i18n';


export default function HeroSection() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);
  const reducedMotion = useReducedMotion();
  const { t } = useI18n();

  // Overlays sit on the real projected Kandy coordinate instead of a guessed offset.
  const mapWidth = width < 600 ? 210 : 280;
  const mapScale = mapWidth / MAP_VIEWBOX.width;
  const mapHeight = MAP_VIEWBOX.height * mapScale;
  const kandy = {
    left: CITY_POINTS.Kandy.x * mapScale,
    top: CITY_POINTS.Kandy.y * mapScale,
  };

  // Animation for orbit rotation
  const orbitAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sonarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) return;

    const loops = [
      // Continuous slow orbit rotation
      Animated.loop(
        Animated.timing(orbitAnim, {
          toValue: 1,
          duration: 24000,
          easing: Easing.linear,
          useNativeDriver: USE_NATIVE_DRIVER,
        })
      ),
      // Pulse glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: USE_NATIVE_DRIVER,
          }),
        ])
      ),
      // Sonar ring expansion
      Animated.loop(
        Animated.timing(sonarAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: USE_NATIVE_DRIVER,
        })
      ),
    ];

    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [orbitAnim, pulseAnim, sonarAnim, reducedMotion]);

  const spin = orbitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = orbitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const sonarScale = sonarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 2.6],
  });

  const sonarOpacity = sonarAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.8, 0.3, 0],
  });

  return (
    <View style={styles.container}>
      {/* Background Starfield Glow Overlay */}
      <View style={styles.ambientGlow} />

      <View style={styles.content}>
        {/* Domain Badge */}
        <View style={styles.domainBadge}>
          <FlagLK width={18} />
          <View style={styles.livePulseDot} />
          <Text style={styles.domainBadgeText}>
            {t('hero.badge')} <Text style={styles.cyanAccent}>(.LK)</Text>
          </Text>
        </View>

        {/* Headline */}
        <Text style={styles.title}>
          SRI LANKA'S{'\n'}
          <Text style={styles.titleCyan}>GATEWAY TO</Text>{'\n'}
          SPACE INNOVATION
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          NASA Space Apps Challenge Kandy 2026 — Anchoring the National Expansion (.lk). Join a global community of innovators using NASA's open data to build solutions for Earth and space.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <Link href="/register" asChild>
            <Pressable accessibilityRole="link" style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>{t('hero.cta.primary')}</Text>
              <Rocket size={18} color="#050912" style={{ marginLeft: 8 }} />
            </Pressable>
          </Link>

          <Link href="/challenges" asChild>
            <Pressable accessibilityRole="link" style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{t('hero.cta.secondary')}</Text>
              <Sparkles size={16} color={colors.text} style={{ marginLeft: 8 }} />
            </Pressable>
          </Link>
        </View>

        {/* Quick Highlights Strip */}
        <View style={styles.highlightStrip}>
          <View style={styles.highlightItem}>
            <Radio size={14} color={colors.primary} />
            <Text style={styles.highlightText}>{t('hero.highlight.sprint')}</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Globe size={14} color={colors.secondary} />
            <Text style={styles.highlightText}>{t('hero.highlight.provinces')}</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Orbit size={14} color={colors.primary} />
            <Text style={styles.highlightText}>{t('hero.highlight.data')}</Text>
          </View>
        </View>
      </View>

      {/* Right Graphic: Futuristic Sri Lanka Orbit Radar & Telemetry */}
      <View style={styles.graphicContainer}>
        {/* Animated Outer Orbit Ring */}
        <Animated.View style={[styles.orbitOuter, { transform: [{ rotate: spin }] }]}>
          <View style={[styles.orbitSatellite, { top: -6, left: '50%' }]}>
            <View style={styles.satelliteDot} />
          </View>
          <View style={[styles.orbitSatellite, { bottom: 20, right: 30 }]}>
            <View style={[styles.satelliteDot, { backgroundColor: colors.secondary }]} />
          </View>
        </Animated.View>

        {/* Animated Inner Counter-Orbit Ring */}
        <Animated.View style={[styles.orbitInner, { transform: [{ rotate: reverseSpin }] }]}>
          <View style={[styles.orbitSatellite, { top: 40, left: 20 }]}>
            <View style={styles.satelliteDot} />
          </View>
        </Animated.View>

        {/* Core Sri Lanka Map & Kandy Hub Node */}
        <View style={[styles.shapeWrapper, { width: mapWidth, height: mapHeight }]}>
          <SriLankaShape width={mapWidth} />

          {/* Kandy Hub Beacon with Sonar Animation */}
          <View
            style={[
              styles.kandyHubContainer,
              { left: kandy.left - 14, top: kandy.top - 14 },
            ]}
          >
            {/* Animated Sonar Pulse Ring */}
            <Animated.View
              style={[
                styles.sonarRing,
                {
                  transform: [{ scale: sonarScale }],
                  opacity: sonarOpacity,
                },
              ]}
            />

            {/* Glowing Kandy Node Core */}
            <Animated.View style={[styles.coreNode, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.coreNodeInner} />
            </Animated.View>

            {/* Live Telemetry Floating Glass Card */}
            <View style={styles.telemetryCard}>
              <View style={styles.telemetryHeader}>
                <View style={styles.statusLiveDot} />
                <Text style={styles.telemetryStatus}>STATUS: ACTIVE</Text>
              </View>
              <Text style={styles.telemetryTitle}>HUB: KANDY CORE</Text>
              <Text style={styles.telemetryCoords}>COORD: 7.29° N, 80.63° E</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    flexDirection: width > 900 ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
    paddingTop: 50,
    paddingBottom: 70,
    alignItems: width > 900 ? 'center' : 'stretch',
    justifyContent: 'space-between',
    backgroundColor: Platform.OS === 'web' ? 'transparent' : colors.background,
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: 'rgba(0, 229, 255, 0.04)',
    pointerEvents: 'none',
  },
  content: {
    flex: 1,
    maxWidth: width > 900 ? 640 : '100%',
    zIndex: 10,
  },
  domainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 31, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginBottom: 26,
    gap: 8,
  },
  flagIcon: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    boxShadow: '0px 0px 6px rgba(0, 229, 255, 1)',
  },
  domainBadgeText: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cyanAccent: {
    color: colors.primary,
  },
  title: {
    fontSize: width > 900 ? 56 : width > 600 ? 44 : width > 400 ? 34 : 29,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    lineHeight: width > 900 ? 64 : width > 600 ? 52 : width > 400 ? 42 : 36,
    marginBottom: 22,
    letterSpacing: -0.5,
  },
  titleCyan: {
    color: colors.primary,
    textShadow: '0px 0px 20px rgba(0, 229, 255, 0.4)',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 26,
    marginBottom: 36,
    maxWidth: 580,
  },
  buttonGroup: {
    flexDirection: width > 600 ? 'row' : 'column',
    gap: 16,
    marginBottom: 36,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 18px rgba(0, 229, 255, 0.5)',
    elevation: 6,
  },
  primaryBtnText: {
    color: '#050912',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 14,
    letterSpacing: 0.8,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 26,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  highlightStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  highlightText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  highlightDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: width < 600 ? 380 : 460,
    width: '100%',
    position: 'relative',
    marginTop: width > 900 ? 0 : 40,
  },
  orbitOuter: {
    position: 'absolute',
    width: width < 600 ? 300 : 440,
    height: width < 600 ? 300 : 440,
    borderRadius: width < 600 ? 150 : 220,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 229, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitInner: {
    position: 'absolute',
    width: width < 600 ? 220 : 320,
    height: width < 600 ? 220 : 320,
    borderRadius: width < 600 ? 110 : 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitSatellite: {
    position: 'absolute',
  },
  satelliteDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    boxShadow: '0px 0px 8px rgba(0, 229, 255, 1)',
  },
  shapeWrapper: {
    position: 'relative',
  },
  kandyHubContainer: {
    position: 'absolute',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sonarRing: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  coreNode: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 107, 53, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  coreNodeInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    boxShadow: '0px 0px 14px rgba(255, 107, 53, 1)',
  },
  telemetryCard: {
    position: 'absolute',
    top: -62,
    left: width < 600 ? -78 : 34,
    width: 175,
    backgroundColor: 'rgba(10, 15, 31, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.35)',
    borderRadius: 8,
    padding: 8,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.6)',
  },
  telemetryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  telemetryStatus: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.5,
  },
  telemetryTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8,
  },
  telemetryCoords: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
