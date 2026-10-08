import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { CheckCircle2, Share2, Compass, Cpu } from './icons';


const PROVINCES = [
  { name: 'NORTHERN', top: '15%', left: '42%', color: colors.primary },
  { name: 'NORTH-CENTRAL', top: '28%', left: '40%', color: colors.primary },
  { name: 'NORTH-WESTERN', top: '40%', left: '18%', color: colors.primary },
  { name: 'CENTRAL (KANDY)', top: '50%', left: '45%', color: colors.secondary, isCore: true },
  { name: 'EASTERN', top: '42%', right: '12%', color: colors.primary },
  { name: 'WESTERN', top: '65%', left: '22%', color: colors.primary },
  { name: 'SABARAGAMUWA', top: '62%', left: '42%', color: colors.primary },
  { name: 'UVA', top: '62%', right: '24%', color: colors.primary },
  { name: 'SOUTHERN', bottom: '10%', left: '38%', color: colors.secondary },
];

export default function ExpansionSection() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>NATIONAL ROADMAP</Text>
          </View>

          <Text style={styles.title}>
            Kandy 2026:{'\n'}
            Anchoring{'\n'}
            <Text style={styles.highlight}>National Expansion</Text>
          </Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            The Kandy Hub serves as the central command for our national space-tech roadmap. By 2026, we aim to establish active innovation nodes in all 9 provinces, connecting every district to the NASA Space Apps ecosystem.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.iconWrapper}>
                <CheckCircle2 size={20} color={colors.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Strategic Core Command Node</Text>
                <Text style={styles.featureDesc}>
                  Kandy leads national mentorship, technical standards, and NASA open data training.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.iconWrapper}>
                <Share2 size={20} color={colors.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>9-Province Network Connectivity</Text>
                <Text style={styles.featureDesc}>
                  Direct linkages between Colombo, Jaffna, Galle, Matara, Batticaloa, and rural university labs.
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.iconWrapper}>
                <Cpu size={20} color={colors.secondary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>UNESCO-Grade Technical Standards</Text>
                <Text style={styles.featureDesc}>
                  Unified evaluation rubrics and global judges certifying top local projects.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Futuristic Provincial Network Diagram */}
        <View style={styles.graphicContainer}>
          <View style={styles.radarCard}>
            <View style={styles.radarHeader}>
              <View style={styles.radarLiveDot} />
              <Text style={styles.radarHeaderText}>NETWORK TOPOLOGY • 9 PROVINCES</Text>
            </View>

            <View style={styles.orbitGraphic}>
              {/* Concentric Radar Circles */}
              <View style={styles.circleOuter} />
              <View style={styles.circleMid} />
              <View style={styles.circleInner} />

              {/* Crosshairs */}
              <View style={styles.crosshairH} />
              <View style={styles.crosshairV} />

              {/* Core Radiating Kandy Node */}
              <View style={styles.centerNodePulse}>
                <View style={styles.centerNode} />
              </View>

              {/* Province Markers & Labels */}
              {PROVINCES.map((prov, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.nodePositioner,
                    {
                      top: (prov as any).top,
                      bottom: (prov as any).bottom,
                      left: (prov as any).left,
                      right: (prov as any).right,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.nodeDot,
                      { backgroundColor: prov.color },
                      prov.isCore && styles.coreGlow,
                    ]}
                  />
                  <Text
                    style={[
                      styles.nodeLabel,
                      { color: prov.color },
                      prov.isCore && styles.coreLabel,
                    ]}
                  >
                    {prov.name}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.radarFooter}>
              <Text style={styles.radarFooterText}>CENTRAL COMMAND: KANDY</Text>
              <Text style={styles.radarFooterText}>COVERAGE: 100%</Text>
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
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    paddingVertical: 70,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderRadius: 24,
    flexDirection: width > 900 ? 'row' : 'column',
    padding: width > 900 ? 50 : 24,
    alignItems: width > 900 ? 'center' : 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    maxWidth: width > 900 ? 560 : '100%',
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  tagText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: width > 900 ? 44 : 32,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    lineHeight: width > 900 ? 52 : 38,
    letterSpacing: -0.5,
  },
  highlight: {
    color: colors.secondary,
  },
  divider: {
    height: 3,
    width: 60,
    backgroundColor: colors.secondary,
    marginTop: 18,
    marginBottom: 24,
    borderRadius: 2,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 25,
    marginBottom: 32,
  },
  featureList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    marginRight: 14,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  featureDesc: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width > 900 ? 0 : 40,
    width: '100%',
  },
  radarCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(5, 9, 18, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  radarLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  radarHeaderText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
  },
  orbitGraphic: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  circleOuter: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 145,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  circleMid: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  circleInner: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.25)',
  },
  crosshairH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  crosshairV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  centerNodePulse: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerNode: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    boxShadow: '0px 0px 10px rgba(255, 107, 53, 1)',
  },
  nodePositioner: {
    position: 'absolute',
    alignItems: 'center',
  },
  nodeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  coreGlow: {
    boxShadow: '0px 0px 8px rgba(255, 107, 53, 1)',
  },
  nodeLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  coreLabel: {
    fontWeight: '900',
    fontFamily: fonts.display,
  },
  radarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  radarFooterText: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 0.8,
  },
});
