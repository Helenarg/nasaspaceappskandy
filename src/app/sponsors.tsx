import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions, Pressable } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { Globe, Eye, Zap, Download, Image as ImageIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 1024;

export default function SponsorsPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.programPill}>
          <View style={styles.programDot} />
          <Text style={styles.programPillText}>GLOBAL PARTNERSHIP PROGRAM</Text>
        </View>
        
        <Text style={styles.heroTitle}>
          PARTNER WITH SRI LANKA'S{'\n'}
          <Text style={styles.heroTitleCyan}>PREMIER SPACE-TECH</Text> INITIATIVE
        </Text>
        <Text style={styles.heroSubtitle}>
          Join us in anchoring the nation's space innovation ecosystem. From the Kandy hub{'\n'}
          to nationwide reach, help us empower 2000+ students and innovators across all 9{'\n'}
          provinces.
        </Text>
      </View>

      {/* Tiers Section */}
      <View style={styles.tiersSection}>
        
        {/* Title Partner */}
        <Text style={styles.tierSectionTitle}>TITLE PARTNER</Text>
        <View style={styles.titlePartnerContainer}>
          <View style={styles.titlePartnerBox}>
            <View style={styles.dashedPlaceholder}>
              <Text style={styles.dashedText}>RESERVED FOR TITLE PARTNER</Text>
            </View>
            <View style={styles.cyanGlowLine} />
          </View>
        </View>

        {/* Platinum & Gold */}
        <Text style={[styles.tierSectionTitle, { marginTop: 60 }]}>PLATINUM & GOLD TIERS</Text>
        <View style={styles.platGoldGrid}>
          
          {/* Platinum 1 */}
          <View style={[styles.tierCard, styles.tierCardPlatinum]}>
            <View style={styles.tierDashedPlaceholder}>
              <Text style={styles.dashedTextSmall}>PLATINUM LOGO</Text>
            </View>
            <Text style={styles.platinumText}>PLATINUM TIER</Text>
          </View>

          {/* Platinum 2 */}
          <View style={[styles.tierCard, styles.tierCardPlatinum]}>
            <View style={styles.tierDashedPlaceholder}>
              <Text style={styles.dashedTextSmall}>PLATINUM LOGO</Text>
            </View>
            <Text style={styles.platinumText}>PLATINUM TIER</Text>
          </View>

          {/* Gold 1 */}
          <View style={[styles.tierCard, styles.tierCardGold]}>
            <View style={styles.tierDashedPlaceholder}>
              <Text style={styles.dashedTextSmall}>GOLD LOGO</Text>
            </View>
            <Text style={styles.goldText}>GOLD TIER</Text>
          </View>

          {/* Gold 2 */}
          <View style={[styles.tierCard, styles.tierCardGold]}>
            <View style={styles.tierDashedPlaceholder}>
              <Text style={styles.dashedTextSmall}>GOLD LOGO</Text>
            </View>
            <Text style={styles.goldText}>GOLD TIER</Text>
          </View>

        </View>

        {/* Ecosystem Partners */}
        <Text style={[styles.tierSectionTitle, { marginTop: 60 }]}>ECOSYSTEM & MEDIA PARTNERS</Text>
        <View style={styles.ecosystemGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <View key={item} style={styles.ecoCard}>
              <ImageIcon color="rgba(255,255,255,0.1)" size={24} />
            </View>
          ))}
        </View>

      </View>

      {/* Value Propositions */}
      <View style={styles.valueSection}>
        <View style={styles.valueGrid}>
          
          {/* Global Reach */}
          <View style={[styles.valueCard, { borderLeftColor: colors.primary }]}>
            <View style={[styles.valueIconBox, { backgroundColor: 'rgba(0, 255, 255, 0.05)', borderColor: 'rgba(0, 255, 255, 0.1)' }]}>
              <Globe color={colors.primary} size={24} />
            </View>
            <Text style={styles.valueTitle}>Global Reach</Text>
            <Text style={styles.valueDesc}>
              Direct alignment with NASA's global brand and access to a network of 10,000+ international participants.
            </Text>
          </View>

          {/* Brand Visibility */}
          <View style={[styles.valueCard, { borderLeftColor: colors.secondary }]}>
            <View style={[styles.valueIconBox, { backgroundColor: 'rgba(255, 107, 0, 0.05)', borderColor: 'rgba(255, 107, 0, 0.1)' }]}>
              <Eye color={colors.secondary} size={24} />
            </View>
            <Text style={styles.valueTitle}>Brand Visibility</Text>
            <Text style={styles.valueDesc}>
              High-impact featured placement across national media, official portals, and social channels with 2.5M+ reach.
            </Text>
          </View>

          {/* Innovation Impact */}
          <View style={[styles.valueCard, { borderLeftColor: colors.primary }]}>
            <View style={[styles.valueIconBox, { backgroundColor: 'rgba(0, 255, 255, 0.05)', borderColor: 'rgba(0, 255, 255, 0.1)' }]}>
              <Zap color={colors.primary} size={24} />
            </View>
            <Text style={styles.valueTitle}>Innovation Impact</Text>
            <Text style={styles.valueDesc}>
              Connect directly with the brightest student innovators, developers, and future leaders of Sri Lanka's tech sector.
            </Text>
          </View>

        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>
            Ready to Shape the Future of{'\n'}
            <Text style={styles.ctaTitleOrange}>Space Innovation</Text> in Sri Lanka?
          </Text>
          <Text style={styles.ctaSubtitle}>
            Secure your partnership tier today and join industry leaders at the forefront of{'\n'}
            national exploration.
          </Text>
          
          <View style={styles.ctaBtnRow}>
            <Pressable style={styles.downloadBtn}>
              <Text style={styles.downloadBtnText}>DOWNLOAD PROSPECTUS (PDF)</Text>
              <Download color="#FFF" size={16} style={{ marginLeft: 8 }} />
            </Pressable>
            
            <Pressable style={styles.scheduleBtn}>
              <Text style={styles.scheduleBtnText}>SCHEDULE A CALL</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  programPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 0, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.2)',
    marginBottom: 30,
  },
  programDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginRight: 8,
  },
  programPillText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: isWeb && !isMobile ? 52 : 32,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: isWeb && !isMobile ? 64 : 44,
    marginBottom: 24,
  },
  heroTitleCyan: {
    color: colors.primary,
    textShadowColor: 'rgba(0, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 700,
  },
  
  // Tiers Section
  tiersSection: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: 80,
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
  },
  tierSectionTitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 30,
    textAlign: 'center',
  },
  
  // Title Partner
  titlePartnerContainer: {
    width: '100%',
    maxWidth: 900,
    alignItems: 'center',
  },
  titlePartnerBox: {
    width: '100%',
    height: isWeb && !isMobile ? 260 : 200,
    backgroundColor: 'rgba(10, 18, 30, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    position: 'relative',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
  },
  dashedPlaceholder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  cyanGlowLine: {
    position: 'absolute',
    bottom: 30,
    width: 60,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  
  // Plat & Gold
  platGoldGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  tierCard: {
    width: isWeb && !isMobile ? 260 : '100%',
    height: 200,
    backgroundColor: 'rgba(10, 18, 30, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  tierCardPlatinum: {
    borderColor: 'rgba(0, 255, 255, 0.2)',
  },
  tierCardGold: {
    borderColor: 'rgba(255, 107, 0, 0.2)',
  },
  tierDashedPlaceholder: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  dashedTextSmall: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  platinumText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  goldText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  
  // Ecosystem Grid
  ecosystemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    maxWidth: 1000,
  },
  ecoCard: {
    width: isWeb && !isMobile ? 100 : 80,
    height: isWeb && !isMobile ? 100 : 80,
    backgroundColor: 'rgba(10, 18, 30, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Value Props
  valueSection: {
    paddingVertical: 80,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  valueGrid: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
    width: '100%',
  },
  valueCard: {
    flex: 1,
    backgroundColor: 'rgba(10, 18, 30, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderLeftWidth: 3,
    borderRadius: 20,
    padding: 30,
  },
  valueIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  valueTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  valueDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  
  // CTA Section
  ctaSection: {
    paddingVertical: 60,
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginBottom: 60,
  },
  ctaBox: {
    width: '100%',
    maxWidth: 1000,
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: isWeb && !isMobile ? 60 : 30,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#FFF',
    fontSize: isWeb && !isMobile ? 40 : 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: isWeb && !isMobile ? 48 : 36,
  },
  ctaTitleOrange: {
    color: colors.secondary,
  },
  ctaSubtitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 600,
  },
  ctaBtnRow: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    gap: 16,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  downloadBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scheduleBtn: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
  },
  scheduleBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
