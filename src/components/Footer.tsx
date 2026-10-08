import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../theme/colors';
import { useI18n } from '../i18n';
import FlagLK from './FlagLK';
import { fonts } from '../theme/typography';
import { Rocket } from './icons';
import { Ionicons } from '@expo/vector-icons';


export default function Footer() {
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {/* Left Column: Brand & Mission */}
        <View style={styles.brandCol}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" style={styles.logoRow}>
              <View style={styles.logoBox}>
                <Text style={styles.logoNasa}>NASA</Text>
              </View>
              <Text style={styles.logoText}>
                nasaspaceapps<Text style={styles.logoLk}>.lk</Text>
              </Text>
              <FlagLK width={20} style={{ marginLeft: 8 }} />
            </Pressable>
          </Link>

          <Text style={styles.brandDesc}>
            Sri Lanka's official gateway to NASA's global hackathon. Anchored in Kandy and expanding across all 9 provinces to empower the next generation of space innovators.
          </Text>

          <View style={styles.socialIconsRow}>
            <Pressable accessibilityRole="button" style={styles.socialBtn} accessibilityLabel="Facebook">
              <Ionicons name="logo-facebook" size={16} color={colors.textMuted} />
            </Pressable>
            <Pressable accessibilityRole="button" style={styles.socialBtn} accessibilityLabel="LinkedIn">
              <Ionicons name="logo-linkedin" size={16} color={colors.textMuted} />
            </Pressable>
            <Pressable accessibilityRole="button" style={styles.socialBtn} accessibilityLabel="Instagram">
              <Ionicons name="logo-instagram" size={16} color={colors.textMuted} />
            </Pressable>
            <Pressable accessibilityRole="button" style={styles.socialBtn} accessibilityLabel="Twitter / X">
              <Ionicons name="logo-twitter" size={16} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* Middle Column 1: Quick Links */}
        <View style={styles.linkGroup}>
          <Text style={styles.groupTitle}>{t('footer.explore')}</Text>
          <Link href="/about" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>About Initiative</Text>
            </Pressable>
          </Link>
          <Link href="/events" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>48-Hour Schedule</Text>
            </Pressable>
          </Link>
          <Link href="/challenges" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>Open Challenges</Text>
            </Pressable>
          </Link>
          <Link href="/ambassadors" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>Campus Ambassadors</Text>
            </Pressable>
          </Link>
        </View>

        {/* Middle Column 2: Participate & Support */}
        <View style={styles.linkGroup}>
          <Text style={styles.groupTitle}>{t('footer.getInvolved')}</Text>
          <Link href="/join" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={[styles.linkText, { color: colors.primary }]}>Volunteer & Mentor</Text>
            </Pressable>
          </Link>
          <Link href="/sponsors" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>Corporate Partners</Text>
            </Pressable>
          </Link>
          <Link href="/news" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>Press & Media Kit</Text>
            </Pressable>
          </Link>
          <Link href="/contact" asChild>
            <Pressable accessibilityRole="link" style={styles.linkItem}>
              <Text style={styles.linkText}>Contact Us</Text>
            </Pressable>
          </Link>
        </View>

        {/* Right Column: Event Callout */}
        <View style={styles.ctaCol}>
          <Text style={styles.groupTitle}>{t('footer.hackathon')}</Text>
          <View style={styles.eventBox}>
            <View style={styles.eventLiveRow}>
              <View style={styles.liveDot} />
              <Text style={styles.eventDate}>OCTOBER 3–5, 2026</Text>
            </View>
            <Text style={styles.eventVenue}>KANDY CONVENTION CENTER</Text>
            <Link href="/register" asChild>
              <Pressable accessibilityRole="link" style={styles.footerRegisterBtn}>
                <Rocket size={14} color="#050912" style={{ marginRight: 6 }} />
                <Text style={styles.footerRegisterBtnText}>{t('nav.register')}</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Bottom Bar: Copyright & Attribution */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyrightText}>
          © 2026 NASA SPACE APPS SRI LANKA • KANDY LOCAL ORGANIZING COMMITTEE
        </Text>
        <Text style={styles.disclaimerText}>
          NASA Space Apps Challenge is a NASA incubator innovation program.
        </Text>
        <Text style={styles.attributionText}>
          Map outline © OpenStreetMap contributors, via geoBoundaries (ODbL 1.0).
        </Text>
      </View>
    </View>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    backgroundColor: '#03060C',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
  },
  inner: {
    flexDirection: width > 900 ? 'row' : 'column',
    justifyContent: 'space-between',
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
    gap: 40,
  },
  brandCol: {
    flex: width > 900 ? 1.4 : undefined,
    maxWidth: width > 900 ? 380 : '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBox: {
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
  },
  logoNasa: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 1.5,
  },
  logoText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: -0.3,
  },
  logoLk: {
    color: colors.primary,
  },
  flagIcon: {
    fontFamily: fonts.body,
    fontSize: 16,
    marginLeft: 6,
  },
  brandDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 20,
  },
  socialIconsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  socialBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkGroup: {
    flex: 1,
    minWidth: 140,
  },
  groupTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
    marginBottom: 18,
  },
  linkItem: {
    marginBottom: 12,
  },
  linkText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  ctaCol: {
    flex: width > 900 ? 1.2 : undefined,
    minWidth: 220,
  },
  eventBox: {
    backgroundColor: 'rgba(10, 15, 31, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    borderRadius: 14,
    padding: 16,
  },
  eventLiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  eventDate: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
  },
  eventVenue: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 14,
  },
  footerRegisterBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    boxShadow: '0px 0px 8px rgba(0, 229, 255, 0.4)',
  },
  footerRegisterBtnText: {
    color: '#050912',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  bottomBar: {
    marginTop: 50,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
    gap: 8,
  },
  copyrightText: {
    fontFamily: fonts.body,
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 10,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  attributionText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    fontFamily: fonts.body,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  disclaimerText: {
    fontFamily: fonts.body,
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
