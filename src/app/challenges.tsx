import React, { useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, useWindowDimensions, Pressable, TextInput, Modal } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { 
  Search, 
  CloudSun, 
  Database, 
  Compass, 
  Satellite, 
  Brain, 
  Leaf,
  FileText,
  LayoutTemplate,
  TerminalSquare,
  Download,
  ArrowRight,
  CheckCircle2,
  X
} from '../components/icons';


const CHALLENGES = [
  {
    id: 1,
    title: 'Climate & Weather Intelligence',
    difficulty: 'MEDIUM',
    diffColor: colors.secondary,
    category: 'AI & ML',
    description: "Utilize deep learning models to predict localized extreme weather anomalies using NASA's Earth observation datasets.",
    icon: CloudSun,
    brief: 'Teams will develop predictive algorithms fusing MODIS surface temperature with atmospheric soundings to forecast micro-climate shifts in tropical island systems.'
  },
  {
    id: 2,
    title: 'Satellite Data Analytics',
    difficulty: 'HARD',
    diffColor: '#EF4444',
    category: 'OPEN DATA',
    description: 'Architect a scalable pipeline to process multi-spectral satellite imagery for detecting urban heat islands and water stress.',
    icon: Database,
    brief: 'Leverage Landsat 8/9 thermal bands and Sentinel-2 optical data to create an automated geospatial indexing tool accessible to regional planners.'
  },
  {
    id: 3,
    title: 'Space Exploration Pathways',
    difficulty: 'MEDIUM',
    diffColor: colors.secondary,
    category: 'ASTROPHYSICS',
    description: 'Design an interactive visualizer for orbital trajectories and deep space mission planning between Earth, Moon, and Mars.',
    icon: Compass,
    brief: 'Build a 3D orbital dynamics simulation calculating delta-V budgets, Lagrange point station-keeping, and communication latency windows.'
  },
  {
    id: 4,
    title: 'Earth Observation Detection',
    difficulty: 'EASY',
    diffColor: colors.primary,
    category: 'CLIMATE TECH',
    description: 'Build a community reporting tool that maps environmental changes, deforestation, and coral bleaching using verified NASA imagery.',
    icon: Satellite,
    brief: 'Create a lightweight mobile-first dashboard enabling citizen scientists to cross-validate ground observations with NASA GIBS imagery layers.'
  },
  {
    id: 5,
    title: 'Deep Learning for Space Feeds',
    difficulty: 'HARD',
    diffColor: '#EF4444',
    category: 'AI & ML',
    description: 'Implement advanced neural networks to categorize deep-field galactic morphologies from the James Webb Space Telescope archive.',
    icon: Brain,
    brief: 'Train convolutional and vision transformer architectures to segment gravitationally lensed quasars and high-redshift proto-galaxies.'
  },
  {
    id: 6,
    title: 'Biodiversity from Orbit',
    difficulty: 'MEDIUM',
    diffColor: colors.secondary,
    category: 'OPEN DATA',
    description: 'Correlate satellite thermal data and vegetation indices with wildlife migratory patterns to identify protected zone risks.',
    icon: Leaf,
    brief: 'Utilize NDVI and soil moisture telemetry to map habitat fragmentation across South Asian biodiversity corridors.'
  }
];

const FILTERS = ['ALL', 'AI & ML', 'CLIMATE TECH', 'ASTROPHYSICS', 'OPEN DATA'];

export default function ChallengesPage() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<typeof CHALLENGES[0] | null>(null);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const filteredChallenges = CHALLENGES.filter((ch) => {
    const matchesFilter = activeFilter === 'ALL' || ch.category === activeFilter;
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (name: string) => {
    setDownloadedItem(name);
    setTimeout(() => setDownloadedItem(null), 3000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <PageMeta
        title="Challenges & Resources | NASA Space Apps Sri Lanka"
        description="Browse NASA's official challenge categories and download the participant toolkits for Space Apps Kandy 2026."
        path="/challenges"
      />
      <Navbar />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>
          CHALLENGES & <Text style={styles.headerTitleCyan}>RESOURCES</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Explore official NASA Space Apps challenge categories, download participant toolkits, and build real-world solutions.
        </Text>

        {/* Search & Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color={colors.textMuted} size={18} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search challenges by keyword..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable accessibilityRole="button" onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                <X size={16} color={colors.textMuted} />
              </Pressable>
            )}
          </View>

          {/* Filter Pill Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsRow}
          >
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={f}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  onPress={() => setActiveFilter(f)}
                >
                  <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Main Two-Column Layout */}
      <View style={styles.mainLayout}>
        {/* Left Column: Challenges Grid (3x2) */}
        <View style={styles.challengesGridCol}>
          <View style={styles.gridHeaderRow}>
            <Text style={styles.resultsCount}>
              SHOWING {filteredChallenges.length} OF {CHALLENGES.length} CHALLENGES
            </Text>
          </View>

          <View style={styles.cardsGrid}>
            {filteredChallenges.map((item) => {
              const IconComp = item.icon;
              return (
                <View key={item.id} style={styles.challengeCard}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.categoryIconBox}>
                      <IconComp color={colors.primary} size={22} />
                    </View>
                    <View style={[styles.diffBadge, { borderColor: item.diffColor }]}>
                      <Text style={[styles.diffText, { color: item.diffColor }]}>
                        {item.difficulty}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.categoryLabel}>{item.category}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>

                  <Pressable
                    accessibilityRole="button"
                    style={styles.briefBtn}
                    onPress={() => setSelectedChallenge(item)}
                  >
                    <Text style={styles.briefBtnText}>VIEW CHALLENGE BRIEF</Text>
                    <ArrowRight size={14} color={colors.primary} style={{ marginLeft: 6 }} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>

        {/* Right Sidebar: Participant Resources */}
        <View style={styles.sidebarCol}>
          <View style={styles.resourceCard}>
            <View style={styles.sidebarHeader}>
              <View style={styles.sidebarLiveDot} />
              <Text style={styles.sidebarTitle}>PARTICIPANT RESOURCES</Text>
            </View>
            <Text style={styles.sidebarSubtitle}>
              Essential guides, templates, and API keys for the 48-hour sprint.
            </Text>

            {/* Resource Item 1 */}
            <View style={styles.resourceItem}>
              <View style={styles.resourceIconBox}>
                <FileText color={colors.primary} size={20} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>Participant Toolkit (PDF)</Text>
                <Text style={styles.resourceMeta}>Official 2026 Rules & Rubric • 4.2 MB</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                style={styles.downloadIconBtn}
                onPress={() => handleDownload('Participant Toolkit')}
              >
                {downloadedItem === 'Participant Toolkit' ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <Download size={16} color={colors.primary} />
                )}
              </Pressable>
            </View>

            {/* Resource Item 2 */}
            <View style={styles.resourceItem}>
              <View style={[styles.resourceIconBox, { backgroundColor: 'rgba(255, 107, 53, 0.1)' }]}>
                <LayoutTemplate color={colors.secondary} size={20} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>10-Slide Pitch Template</Text>
                <Text style={styles.resourceMeta}>Keynote & PPTX Format • 1.8 MB</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                style={styles.downloadIconBtn}
                onPress={() => handleDownload('10-Slide Pitch Template')}
              >
                {downloadedItem === '10-Slide Pitch Template' ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <Download size={16} color={colors.primary} />
                )}
              </Pressable>
            </View>

            {/* Resource Item 3 */}
            <View style={styles.resourceItem}>
              <View style={styles.resourceIconBox}>
                <TerminalSquare color={colors.primary} size={20} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>NASA Open Data API Guide</Text>
                <Text style={styles.resourceMeta}>Endpoints & Code Snippets • 2.4 MB</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                style={styles.downloadIconBtn}
                onPress={() => handleDownload('NASA Open Data API Guide')}
              >
                {downloadedItem === 'NASA Open Data API Guide' ? (
                  <CheckCircle2 size={16} color="#10B981" />
                ) : (
                  <Download size={16} color={colors.primary} />
                )}
              </Pressable>
            </View>

            {downloadedItem && (
              <View style={styles.downloadSuccessBanner}>
                <CheckCircle2 size={14} color="#10B981" />
                <Text style={styles.downloadSuccessText}>{downloadedItem} Downloaded!</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Challenge Brief Modal */}
      <Modal
        visible={!!selectedChallenge}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedChallenge(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalCategory}>{selectedChallenge?.category}</Text>
                <Text style={styles.modalTitle}>{selectedChallenge?.title}</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => setSelectedChallenge(null)} style={styles.closeBtn}>
                <X size={20} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>CHALLENGE OVERVIEW</Text>
              <Text style={styles.modalDesc}>{selectedChallenge?.description}</Text>

              <Text style={[styles.modalLabel, { marginTop: 16 }]}>DETAILED BRIEF & SCOPE</Text>
              <Text style={styles.modalBrief}>{selectedChallenge?.brief}</Text>

              <View style={styles.modalMetaRow}>
                <View style={styles.modalMetaItem}>
                  <Text style={styles.modalMetaLabel}>DIFFICULTY LEVEL</Text>
                  <Text style={[styles.modalMetaVal, { color: selectedChallenge?.diffColor }]}>
                    {selectedChallenge?.difficulty}
                  </Text>
                </View>
                <View style={styles.modalMetaItem}>
                  <Text style={styles.modalMetaLabel}>DATASETS</Text>
                  <Text style={styles.modalMetaVal}>NASA Open Data / GIBS</Text>
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              style={styles.modalCloseAction}
              onPress={() => setSelectedChallenge(null)}
            >
              <Text style={styles.modalCloseActionText}>CLOSE BRIEF</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  headerSection: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: width > 768 ? 44 : width > 480 ? 32 : 27,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  headerTitleCyan: {
    color: colors.primary,
    textShadow: '0px 0px 16px rgba(0, 229, 255, 0.4)',
  },
  headerSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 680,
    marginBottom: 30,
  },
  searchContainer: {
    gap: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontFamily: fonts.body,
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  clearSearchBtn: {
    padding: 6,
  },
  filterPillsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  filterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterPillActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderColor: colors.primary,
    boxShadow: '0px 0px 8px rgba(0, 229, 255, 0.5)',
  },
  filterPillText: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  filterPillTextActive: {
    color: colors.primary,
  },
  mainLayout: {
    flexDirection: width > 1024 ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    paddingVertical: 30,
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
    gap: 30,
  },
  challengesGridCol: {
    flex: width > 1024 ? 2.2 : undefined,
  },
  gridHeaderRow: {
    marginBottom: 16,
  },
  resultsCount: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  challengeCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    padding: 24,
    width: width > 768 ? '48%' : '100%',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diffBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 0.8,
  },
  categoryLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: fonts.display,
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDesc: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  briefBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 'auto',
  },
  briefBtnText: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sidebarCol: {
    flex: width > 1024 ? 1 : undefined,
    minWidth: 280,
  },
  resourceCard: {
    backgroundColor: 'rgba(10, 15, 31, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.4)',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  sidebarLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  sidebarTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
  },
  sidebarSubtitle: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 22,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  resourceIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontFamily: fonts.bodyBold,
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  resourceMeta: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  downloadIconBtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  downloadSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  downloadSuccessText: {
    fontFamily: fonts.bodyBold,
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#0A0F1F',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    borderRadius: 22,
    padding: 24,
    width: '100%',
    maxWidth: 540,
    boxShadow: '0px 16px 28px rgba(0, 0, 0, 0.6)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 14,
  },
  modalCategory: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 4,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    fontFamily: fonts.display,
    maxWidth: 400,
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    paddingVertical: 20,
  },
  modalLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: fonts.display,
    letterSpacing: 1,
    marginBottom: 6,
  },
  modalDesc: {
    fontFamily: fonts.body,
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  modalBrief: {
    fontFamily: fonts.body,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 22,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  modalMetaItem: {},
  modalMetaLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  modalMetaVal: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: fonts.display,
    color: colors.text,
  },
  modalCloseAction: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseActionText: {
    color: '#050912',
    fontWeight: '800',
    fontFamily: fonts.display,
    fontSize: 12,
    letterSpacing: 0.8,
  },
});
