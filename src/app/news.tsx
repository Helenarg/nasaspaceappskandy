import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions, Pressable } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { 
  Rocket, 
  Globe, 
  Orbit, 
  ArrowRight,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Archive,
  Download,
  Layers,
  PenTool,
  Share2,
  Palette
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 1024;

const PRESS_RELEASES = [
  {
    id: 1,
    icon: Rocket,
    date: 'OCT 15, 2024',
    title: 'NASA Space Apps Kandy 2026 Registration Opens',
    desc: 'We are officially open for participant registrations for the biggest hackathon event in Kandy. Join the mission to solve global challenges.'
  },
  {
    id: 2,
    icon: Globe,
    date: 'SEP 28, 2024',
    title: '50+ Schools Join National Innovation Roadmap',
    desc: 'Over 50 schools and higher education institutes have officially partnered with our all-island expansion initiative starting this month.'
  },
  {
    id: 3,
    icon: Orbit,
    date: 'SEP 10, 2024',
    title: 'Kandy Hub Expands to 9 Provinces Nationwide',
    desc: 'A strategic milestone reached as Kandy Hub officially anchors our national network, establishing regional nodes in all 9 provinces.'
  }
];

export default function NewsPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.pillContainer}>
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>MEDIA & PRESS CENTER</Text>
        </View>
        
        <Text style={styles.heroTitle}>
          NEWS & <Text style={styles.heroTitleCyan}>MEDIA</Text> HUB
        </Text>
        <Text style={styles.heroSubtitle}>
          Explore official announcements, project milestones, and access our comprehensive brand toolkit for{'\n'}media partners.
        </Text>
      </View>

      {/* Press Releases Section */}
      <View style={styles.pressSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest Press Releases</Text>
          <Pressable style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>VIEW ALL NEWS</Text>
            <ArrowRight color={colors.primary} size={16} style={{ marginLeft: 6 }} />
          </Pressable>
        </View>

        <View style={styles.cardsGrid}>
          {PRESS_RELEASES.map(item => {
            const IconComp = item.icon;
            return (
              <View key={item.id} style={styles.pressCard}>
                <View style={styles.cardTopHalf}>
                  <IconComp color="rgba(0, 255, 255, 0.4)" size={32} />
                </View>
                <View style={styles.cardBottomHalf}>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                  <Pressable style={styles.readMoreBtn}>
                    <Text style={styles.readMoreText}>Read More</Text>
                    <ArrowRight color="#FFF" size={14} style={{ marginLeft: 6 }} />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Media Kit Section */}
      <View style={styles.mediaKitSection}>
        <View style={styles.mediaKitBox}>
          
          {/* Left: Assets Grid */}
          <View style={styles.mediaKitLeft}>
            <Text style={styles.mediaKitTitle}>
              OFFICIAL MEDIA KIT{'\n'}& BRAND ASSETS
            </Text>
            <View style={styles.mediaKitTitleUnderline} />
            
            <View style={styles.assetsGrid}>
              
              <View style={styles.assetItem}>
                <View style={styles.assetIconBox}>
                  <FileText color="rgba(255,255,255,0.4)" size={24} />
                </View>
                <View style={styles.assetTextRow}>
                  <Text style={styles.assetName}>Brand Guidelines</Text>
                  <Text style={styles.assetMeta}>PDF | 12.4 MB</Text>
                </View>
              </View>

              <View style={styles.assetItem}>
                <View style={styles.assetIconBox}>
                  <ImageIcon color="rgba(255,255,255,0.4)" size={24} />
                </View>
                <View style={styles.assetTextRow}>
                  <Text style={styles.assetName}>Logo Pack</Text>
                  <Text style={styles.assetMeta}>PNG / SVG / EPS</Text>
                </View>
              </View>

              <View style={styles.assetItem}>
                <View style={styles.assetIconBox}>
                  <LayoutTemplate color="rgba(255,255,255,0.4)" size={24} />
                </View>
                <View style={styles.assetTextRow}>
                  <Text style={styles.assetName}>Press Template</Text>
                  <Text style={styles.assetMeta}>DOCX | 2.1 MB</Text>
                </View>
              </View>

              <View style={styles.assetItem}>
                <View style={styles.assetIconBox}>
                  <Archive color="rgba(255,255,255,0.4)" size={24} />
                </View>
                <View style={styles.assetTextRow}>
                  <Text style={styles.assetName}>Social Assets</Text>
                  <Text style={styles.assetMeta}>ZIP | 45.8 MB</Text>
                </View>
              </View>

            </View>
          </View>

          {/* Right: Download panel */}
          <View style={styles.mediaKitRight}>
            <Pressable style={styles.downloadBigBtn}>
              <Text style={styles.downloadBigBtnText}>DOWNLOAD MEDIA KIT (.ZIP)</Text>
              <Download color="#FFF" size={20} style={{ marginLeft: 12 }} />
            </Pressable>
            
            <Text style={styles.downloadDesc}>
              Includes complete brand assets, visual guidelines, and press{'\n'}templates in a single high-resolution package.
            </Text>

            <View style={styles.featuresGrid}>
              <View style={styles.featurePill}>
                <Layers color={colors.primary} size={16} style={{ marginRight: 8 }} />
                <Text style={styles.featurePillText}>100+ ASSETS</Text>
              </View>
              <View style={styles.featurePill}>
                <PenTool color={colors.primary} size={16} style={{ marginRight: 8 }} />
                <Text style={styles.featurePillText}>5 TEMPLATES</Text>
              </View>
              <View style={styles.featurePill}>
                <Share2 color={colors.primary} size={16} style={{ marginRight: 8 }} />
                <Text style={styles.featurePillText}>SOCIAL PACK</Text>
              </View>
              <View style={styles.featurePill}>
                <Palette color={colors.primary} size={16} style={{ marginRight: 8 }} />
                <Text style={styles.featurePillText}>HD VARIANT</Text>
              </View>
            </View>
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
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    marginBottom: 30,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  pillText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: isWeb && !isMobile ? 56 : 36,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 24,
  },
  heroTitleCyan: {
    color: colors.primary,
    textShadowColor: 'rgba(0, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 700,
  },

  // Press Releases Section
  pressSection: {
    paddingHorizontal: '5%',
    paddingBottom: 80,
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardsGrid: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    gap: 24,
  },
  pressCard: {
    flex: 1,
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardTopHalf: {
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.02)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  cardBottomHalf: {
    padding: 24,
  },
  cardDate: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 28,
  },
  cardDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Media Kit Section
  mediaKitSection: {
    paddingHorizontal: '5%',
    paddingBottom: 80,
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  mediaKitBox: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    backgroundColor: 'rgba(10, 18, 30, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: isWeb && !isMobile ? 60 : 30,
    gap: 60,
  },
  mediaKitLeft: {
    flex: 1.2,
  },
  mediaKitTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 16,
    lineHeight: 40,
  },
  mediaKitTitleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: colors.secondary,
    borderRadius: 2,
    marginBottom: 40,
  },
  assetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  assetItem: {
    width: isWeb && !isMobile ? 'calc(50% - 10px)' : '100%',
    marginBottom: 10,
  },
  assetIconBox: {
    width: '100%',
    height: 160,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetTextRow: {
    paddingHorizontal: 4,
  },
  assetName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  assetMeta: {
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
  },
  
  mediaKitRight: {
    flex: 1,
    justifyContent: 'center',
  },
  downloadBigBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  downloadBigBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  downloadDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 18, 30, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: isWeb && !isMobile ? 'calc(50% - 8px)' : '100%',
  },
  featurePillText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
