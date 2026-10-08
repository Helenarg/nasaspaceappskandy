import React, { useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, useWindowDimensions, Pressable } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { Globe, Eye, Zap, Download, Calendar, CheckCircle2, Shield } from '../components/icons';


const PLATINUM_GOLD = [
  { name: 'PLATINUM PARTNER 01', tier: 'PLATINUM', color: colors.primary },
  { name: 'PLATINUM PARTNER 02', tier: 'PLATINUM', color: colors.primary },
  { name: 'GOLD PARTNER 01', tier: 'GOLD', color: colors.secondary },
  { name: 'GOLD PARTNER 02', tier: 'GOLD', color: colors.secondary },
];

const ECOSYSTEM_PARTNERS = [
  'UNIVERSITY OF PERADENIYA',
  'SRI LANKA TELECOM',
  'ICTA SRI LANKA',
  'ROYAL ASTRONOMICAL SOC.',
  'ARTHUR C. CLARKE INST.',
  'TECH INNOVATION LK',
  'NATIONAL SCIENCE FOUNDATION',
  'KANDY CITY COUNCIL',
];

export default function SponsorsPage() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PageMeta
        title="Sponsors & Partners | NASA Space Apps Sri Lanka"
        description="Partner with Sri Lanka's premier space-tech initiative. Sponsorship tiers, reach and prospectus."
        path="/sponsors"
      />
      <Navbar />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.programPill}>
          <Shield size={14} color={colors.primary} />
          <Text style={styles.programPillText}>CORPORATE PARTNERSHIP PROGRAM</Text>
        </View>

        <Text style={styles.heroTitle}>
          PARTNER WITH SRI LANKA'S{'\n'}
          <Text style={styles.heroTitleCyan}>PREMIER SPACE-TECH</Text> INITIATIVE
        </Text>
        <Text style={styles.heroSubtitle}>
          Join leading technology enterprises and public institutions in anchoring Sri Lanka's national space roadmap. Empower 2,000+ students and innovators across all 9 provinces.
        </Text>
      </View>

      {/* Tiered Sponsor Wall Section */}
      <View style={styles.tiersSection}>
        {/* Title Partner */}
        <View style={styles.tierHeaderRow}>
          <View style={styles.tierDot} />
          <Text style={styles.tierSectionTitle}>TITLE PARTNER TIER</Text>
        </View>

        <View style={styles.titlePartnerContainer}>
          <View style={styles.titlePartnerBox}>
            <View style={styles.titleBadge}>
              <Text style={styles.titleBadgeText}>EXCLUSIVE • TITLE PARTNER</Text>
            </View>
            <View style={styles.dashedPlaceholder}>
              <Text style={styles.dashedText}>RESERVED FOR TITLE PARTNER</Text>
              <Text style={styles.dashedSub}>Naming Rights • Keynote Address • All Media Packs</Text>
            </View>
            <View style={styles.cyanGlowLine} />
          </View>
        </View>

        {/* Platinum & Gold */}
        <View style={[styles.tierHeaderRow, { marginTop: 60 }]}>
          <View style={[styles.tierDot, { backgroundColor: colors.secondary }]} />
          <Text style={styles.tierSectionTitle}>PLATINUM & GOLD TIERS</Text>
        </View>

        <View style={styles.platGoldGrid}>
          {PLATINUM_GOLD.map((item, idx) => (
            <View key={idx} style={[styles.tierCard, { borderColor: `${item.color}35` }]}>
              <View style={styles.tierDashedPlaceholder}>
                <Text style={styles.dashedTextSmall}>{item.name}</Text>
              </View>
              <Text style={[styles.tierLabel, { color: item.color }]}>{item.tier} TIER</Text>
            </View>
          ))}
        </View>

        {/* Ecosystem & Media Partners */}
        <View style={[styles.tierHeaderRow, { marginTop: 60 }]}>
          <View style={styles.tierDot} />
          <Text style={styles.tierSectionTitle}>ECOSYSTEM & MEDIA PARTNERS</Text>
        </View>

        <View style={styles.ecosystemGrid}>
          {ECOSYSTEM_PARTNERS.map((eco, idx) => (
            <View key={idx} style={styles.ecosystemCard}>
              <Text style={styles.ecosystemText}>{eco}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Partnership Benefits Callout */}
      <View style={styles.benefitsSection}>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <View style={styles.iconCircle}>
              <Globe size={24} color={colors.primary} />
            </View>
            <Text style={styles.benefitTitle}>Global & Regional Reach</Text>
            <Text style={styles.benefitDesc}>
              Visibility across 10,000+ NASA Space Apps global channels, broadcast media, and press networks in South Asia.
            </Text>
          </View>

          <View style={styles.benefitCard}>
            <View style={[styles.iconCircle, { borderColor: 'rgba(255, 107, 53, 0.3)' }]}>
              <Eye size={24} color={colors.secondary} />
            </View>
            <Text style={styles.benefitTitle}>High-Impact Brand Presence</Text>
            <Text style={styles.benefitDesc}>
              Featured prominent branding on the .lk domain, event stage backdrops, live hacker broadcasts, and swag packages.
            </Text>
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.iconCircle}>
              <Zap size={24} color={colors.primary} />
            </View>
            <Text style={styles.benefitTitle}>Top Tech Talent Pipeline</Text>
            <Text style={styles.benefitDesc}>
              Direct engagement with elite software engineers, data scientists, and hardware hackers from top universities.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA Callout Card */}
      <View style={styles.bottomCtaSection}>
        <View style={styles.prospectusCard}>
          <Text style={styles.prospectusTitle}>
            Ready to Anchor the Space Economy in Sri Lanka?
          </Text>
          <Text style={styles.prospectusSubtitle}>
            Download the official 2026 Sponsorship Prospectus containing tier specifications, deliverables, and partnership agreements.
          </Text>

          <View style={styles.prospectusButtonRow}>
            <Pressable accessibilityRole="button" style={styles.prospectusBtn} onPress={handleDownload}>
              <Download size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.prospectusBtnText}>DOWNLOAD SPONSORSHIP PROSPECTUS (PDF)</Text>
            </Pressable>

            <Pressable accessibilityRole="button" style={styles.callBtn}>
              <Calendar size={18} color={colors.text} style={{ marginRight: 8 }} />
              <Text style={styles.callBtnText}>SCHEDULE PARTNERSHIP CALL</Text>
            </Pressable>
          </View>

          {downloaded && (
            <View style={styles.downloadNotification}>
              <CheckCircle2 size={16} color="#10B981" />
              <Text style={styles.downloadNotificationText}>
                Sponsorship Prospectus (PDF) downloaded successfully!
              </Text>
            </View>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? 'transparent' : colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  programPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  programPillText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: width > 768 ? 44 : width > 480 ? 32 : 27,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: width > 768 ? 52 : width > 480 ? 38 : 33,
    marginBottom: 16,
  },
  heroTitleCyan: {
    color: colors.primary,
    textShadow: '0px 0px 16px rgba(0, 229, 255, 0.4)',
  },
  heroSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 700,
  },
  tiersSection: {
    paddingVertical: 50,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  tierHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  tierSectionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 1.5,
  },
  titlePartnerContainer: {
    width: '100%',
  },
  titlePartnerBox: {
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.35)',
    borderRadius: 22,
    padding: 36,
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0px 0px 24px rgba(0, 229, 255, 0.25)',
  },
  titleBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 20,
  },
  titleBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
  },
  dashedPlaceholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    paddingVertical: 36,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  dashedText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 6,
  },
  dashedSub: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
  },
  cyanGlowLine: {
    position: 'absolute',
    bottom: 0,
    width: 140,
    height: 2,
    backgroundColor: colors.primary,
    boxShadow: '0px 0px 8px rgba(0, 229, 255, 1)',
  },
  platGoldGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  tierCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.8)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    width: width > 768 ? '48%' : '100%',
    alignItems: 'center',
  },
  tierDashedPlaceholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 10,
    paddingVertical: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  dashedTextSmall: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  tierLabel: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
  },
  ecosystemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ecosystemCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: width > 900 ? '23%' : width > 600 ? '47%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecosystemText: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  benefitsSection: {
    paddingVertical: 50,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  benefitCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    padding: 24,
    width: width > 900 ? '31%' : '100%',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  benefitTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 8,
  },
  benefitDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  bottomCtaSection: {
    paddingVertical: 50,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  prospectusCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
    borderRadius: 24,
    padding: width > 768 ? 44 : 24,
    alignItems: 'center',
    boxShadow: '0px 16px 28px rgba(0, 0, 0, 0.5)',
  },
  prospectusTitle: {
    color: colors.text,
    fontSize: width > 768 ? 32 : 24,
    fontWeight: '900',
    fontFamily: fonts.display,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  prospectusSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 680,
    marginBottom: 30,
  },
  prospectusButtonRow: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 14,
    alignItems: 'center',
  },
  prospectusBtn: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 12,
    boxShadow: '0px 0px 16px rgba(255, 107, 53, 0.5)',
  },
  prospectusBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 0.8,
  },
  callBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  callBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  downloadNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 8,
    padding: 10,
    marginTop: 18,
  },
  downloadNotificationText: {
    fontFamily: fonts.bodyBold,
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700',
  },
});
