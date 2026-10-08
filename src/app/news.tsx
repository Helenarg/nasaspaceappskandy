import { useViewport } from '../theme/useViewport';
import { layout } from '../theme/layout';
import PageShell from '../components/PageShell';
import PageHeader from '../components/PageHeader';
import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { Rocket, Globe, Orbit, ArrowRight, FileText, Image as ImageIcon, LayoutTemplate, Archive, Download, CheckCircle2 } from '../components/icons';


const PRESS_RELEASES = [
  {
    id: 1,
    icon: Rocket,
    date: 'OCT 15, 2026',
    title: 'NASA Space Apps Kandy 2026 Registration Opens',
    desc: 'Official registration opens for the largest global hackathon in Kandy. Innovators can join from anywhere across Sri Lanka with mentor support.',
    tag: 'ANNOUNCEMENT',
  },
  {
    id: 2,
    icon: Globe,
    date: 'SEP 28, 2026',
    title: '50+ Schools & Universities Join National Roadmap',
    desc: 'High schools, technical colleges, and premier universities officially partner with the Kandy Hub to establish regional space-tech labs.',
    tag: 'EXPANSION',
  },
  {
    id: 3,
    icon: Orbit,
    date: 'SEP 10, 2026',
    title: 'Kandy Hub Extends Innovation Network to 9 Provinces',
    desc: 'A strategic milestone reached as Kandy anchors our national network, establishing certified participant nodes in all 9 provinces.',
    tag: 'PARTNERSHIP',
  },
];

const ASSETS = [
  { name: 'Brand Guidelines', format: 'PDF', icon: FileText, size: '4.8 MB' },
  { name: 'Official Logo Pack', format: 'PNG/SVG', icon: ImageIcon, size: '12.4 MB' },
  { name: 'Press Release Template', format: 'DOCX', icon: LayoutTemplate, size: '820 KB' },
  { name: 'Social Media Kit', format: 'ZIP', icon: Archive, size: '28.5 MB' },
];

export default function NewsPage() {
  const { width } = useViewport();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [downloadedZip, setDownloadedZip] = useState(false);

  const handleDownloadZip = () => {
    setDownloadedZip(true);
    setTimeout(() => setDownloadedZip(false), 4000);
  };

  return (
    <PageShell style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PageMeta
        title="News & Media Kit | NASA Space Apps Sri Lanka"
        description="Press releases, brand assets and the official media kit for NASA Space Apps Challenge Sri Lanka."
        path="/news"
      />
      <Navbar />

      {/* Hero Section */}
      <PageHeader number="07" eyebrow="NEWS & MEDIA" title={"Stories from\nour community."} description="Follow the journey, explore our latest updates, and find resources for sharing the Space Apps story." />

      {/* Top Section - News Grid (3 Cards) */}
      <View style={styles.newsSection}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.liveDot} />
          <Text style={styles.sectionHeaderTitle}>LATEST PRESS RELEASES</Text>
        </View>

        <View style={styles.newsGrid}>
          {PRESS_RELEASES.map((item) => {
            const IconComp = item.icon;
            return (
              <View key={item.id} style={styles.newsCard}>
                <View style={styles.newsCardTop}>
                  <View style={styles.newsIconBox}>
                    <IconComp size={20} color={colors.primary} />
                  </View>
                  <View style={styles.newsTagBadge}>
                    <Text style={styles.newsTagText}>{item.tag}</Text>
                  </View>
                </View>

                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsCardTitle}>{item.title}</Text>
                <Text style={styles.newsCardDesc}>{item.desc}</Text>

                <Pressable accessibilityRole="button" style={styles.readMoreBtn}>
                  <Text style={styles.readMoreText}>READ FULL STATEMENT</Text>
                  <ArrowRight size={14} color={colors.primary} style={{ marginLeft: 6 }} />
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      {/* Bottom Section - Official Media Kit Container */}
      <View style={styles.mediaKitSection}>
        <View style={styles.mediaKitCard}>
          <View style={styles.mediaKitHeader}>
            <View style={styles.mediaKitBadge}>
              <Text style={styles.mediaKitBadgeText}>PRESS DOWNLOADS</Text>
            </View>
            <Text style={styles.mediaKitTitle}>
              OFFICIAL MEDIA KIT & <Text style={{ color: colors.secondary }}>BRAND ASSETS</Text>
            </Text>
            <View style={styles.coralLine} />
            <Text style={styles.mediaKitSubtitle}>
              Approved logo marks, typography guides, and high-resolution visuals for journalists and partners.
            </Text>
          </View>

          <View style={styles.mediaKitSplit}>
            {/* Left Column: 2x2 Asset Preview Grid */}
            <View style={styles.assetGridCol}>
              <Text style={styles.colLabel}>INCLUDED IN MEDIA PACKAGE</Text>
              <View style={styles.assetGrid2x2}>
                {ASSETS.map((asset, idx) => {
                  const IconComp = asset.icon;
                  return (
                    <View key={idx} style={styles.assetTile}>
                      <View style={styles.assetTopRow}>
                        <IconComp size={20} color={colors.primary} />
                        <View style={styles.formatPill}>
                          <Text style={styles.formatPillText}>{asset.format}</Text>
                        </View>
                      </View>
                      <Text style={styles.assetTileName}>{asset.name}</Text>
                      <Text style={styles.assetTileSize}>{asset.size}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Right Column: Download Action Panel */}
            <View style={styles.downloadActionCol}>
              <View style={styles.actionInnerBox}>
                <View style={styles.zipIconCircle}>
                  <Archive size={32} color={colors.secondary} />
                </View>

                <Text style={styles.zipTitle}>Complete Press Package</Text>
                <Text style={styles.zipDesc}>
                  Contains vector logos (.SVG, .PNG), press releases, and photo stills (46.5 MB).
                </Text>

                <Pressable accessibilityRole="button" style={styles.downloadZipBtn} onPress={handleDownloadZip}>
                  <Download size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.downloadZipBtnText}>DOWNLOAD MEDIA KIT (.ZIP)</Text>
                </Pressable>

                {downloadedZip && (
                  <View style={styles.successDownloadRow}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <Text style={styles.successDownloadText}>Media Kit (.ZIP) Download started!</Text>
                  </View>
                )}

                <View style={styles.pressContactBox}>
                  <Text style={styles.pressContactLabel}>PRESS INQUIRIES & INTERVIEWS</Text>
                  <Text style={styles.pressContactEmail}>press@nasaspaceapps.lk</Text>
                </View>
              </View>
            </View>
          </View>
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
  newsSection: {
    ...layout.section(width),
    gap: layout.gap(width)
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary
  },
  sectionHeaderTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: 1.5
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20
  },
  newsCard: {
    backgroundColor: 'rgba(11, 32, 81, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: layout.cardPadding(width),
    width: width > 900 ? '31%' : '100%',
    justifyContent: 'space-between'
  },
  newsCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  newsIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(234, 254, 7, 0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  newsTagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  newsTagText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  newsDate: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 8
  },
  newsCardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.display,
    lineHeight: 25,
    marginBottom: 10
  },
  newsCardDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 20
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12
  },
  readMoreText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  mediaKitSection: {
    ...layout.section(width),
    gap: layout.gap(width)
  },
  mediaKitCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(234, 254, 7, 0.25)',
    borderRadius: 8,
    padding: layout.cardPadding(width)
  },
  mediaKitHeader: {
    marginBottom: 32
  },
  mediaKitBadge: {
    backgroundColor: 'rgba(46, 150, 245, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(46, 150, 245, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 14
  },
  mediaKitBadgeText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1
  },
  mediaKitTitle: {
    color: colors.text,
    fontSize: width > 768 ? 32 : 24,
    fontWeight: '900',
    fontFamily: fonts.display,
    letterSpacing: -0.3
  },
  coralLine: {
    width: 60,
    height: 3,
    backgroundColor: colors.secondary,
    marginVertical: 14,
    borderRadius: 2
  },
  mediaKitSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 640
  },
  mediaKitSplit: {
    flexDirection: width > 900 ? 'row' : 'column',
    gap: 36
  },
  assetGridCol: {
    flex: width > 900 ? 1.3 : undefined
  },
  colLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1.2,
    marginBottom: 16
  },
  assetGrid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14
  },
  assetTile: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 16,
    width: width > 600 ? '48%' : '100%',
    justifyContent: 'space-between'
  },
  assetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  formatPill: {
    backgroundColor: 'rgba(234, 254, 7, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    minHeight: 44
  },
  formatPillText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8
  },
  assetTileName: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4
  },
  assetTileSize: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 11
  },
  downloadActionCol: {
    flex: width > 900 ? 1 : undefined
  },
  actionInnerBox: {
    backgroundColor: 'rgba(7, 23, 63, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(46, 150, 245, 0.25)',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center'
  },
  zipIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(46, 150, 245, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  zipTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 6
  },
  zipDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20
  },
  downloadZipBtn: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    width: '100%'
  },
  downloadZipBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 12,
    letterSpacing: 0.8
  },
  successDownloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14
  },
  successDownloadText: {
    fontFamily: fonts.bodyBold,
    color: '#10B981',
    fontSize: 12,
    fontWeight: '700'
  },
  pressContactBox: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center'
  },
  pressContactLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8,
    marginBottom: 4
  },
  pressContactEmail: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700'
  },
});
