import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions, Pressable, TextInput } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { 
  Search, 
  CloudSun, 
  Database, 
  Compass, 
  Satellite, 
  Brain, 
  Leaf,
  Archive,
  FileText,
  LayoutTemplate,
  TerminalSquare,
  Download,
  ArrowRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 1024;

const CHALLENGES = [
  {
    id: 1,
    title: 'Climate & Weather Intelligence',
    difficulty: 'MEDIUM',
    category: 'AI & ML',
    description: "Utilize deep learning models to predict localized weather anomalies using NASA's Earth observation datasets.",
    icon: CloudSun
  },
  {
    id: 2,
    title: 'Satellite Data Analytics',
    difficulty: 'HARD',
    category: 'OPEN DATA',
    description: 'Architect a scalable pipeline to process multi-spectral satellite imagery for detecting urban heat islands.',
    icon: Database
  },
  {
    id: 3,
    title: 'Space Exploration Pathways',
    difficulty: 'MEDIUM',
    category: 'ASTROPHYSICS',
    description: 'Design an interactive visualizer for orbital trajectories and deep space mission planning.',
    icon: Compass
  },
  {
    id: 4,
    title: 'Earth Observation Detection',
    difficulty: 'EASY',
    category: 'CLIMATE TECH',
    description: 'Build a community reporting tool that maps environmental changes using verified NASA imagery.',
    icon: Satellite
  },
  {
    id: 5,
    title: 'Deep Learning for Space',
    difficulty: 'HARD',
    category: 'AI & ML',
    description: 'Implement advanced neural networks to categorize galaxies from the James Webb Space Telescope feed.',
    icon: Brain
  },
  {
    id: 6,
    title: 'Biodiversity from Space',
    difficulty: 'MEDIUM',
    category: 'OPEN DATA',
    description: 'Correlate satellite thermal data with wildlife migratory patterns to identify protected zone risks.',
    icon: Leaf
  }
];

const FILTERS = ['ALL', 'AI & ML', 'CLIMATE TECH', 'ASTROPHYSICS', 'OPEN DATA'];

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>
          CHALLENGES & <Text style={styles.headerTitleCyan}>RESOURCES</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Explore NASA's official challenge categories and equip yourself with the{'\n'}
          tools needed to innovate for a better future.
        </Text>
        
        {/* Search & Filters */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color={colors.textMuted} size={20} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search challenges, categories, or keywords..." 
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {FILTERS.map(f => (
            <Pressable 
              key={f} 
              style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <View style={styles.mainLayout}>
        
        {/* Left Side: Challenges Grid */}
        <View style={styles.challengesGrid}>
          {CHALLENGES.map(challenge => {
            const IconComponent = challenge.icon;
            let diffColor = '#FF6B00'; // Medium default
            if (challenge.difficulty === 'HARD') diffColor = '#FF3333';
            if (challenge.difficulty === 'EASY') diffColor = '#00CC66';
            
            return (
              <View key={challenge.id} style={styles.challengeCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconBox}>
                    <IconComponent color={colors.primary} size={28} />
                  </View>
                </View>
                
                <View style={styles.tagRow}>
                  <Text style={[styles.diffTag, { color: diffColor }]}>{challenge.difficulty}</Text>
                  <Text style={styles.catTag}>{challenge.category}</Text>
                </View>
                
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <Text style={styles.cardDesc}>{challenge.description}</Text>
                
                <View style={{ flex: 1 }} />
                
                <Pressable style={styles.viewBtn}>
                  <Text style={styles.viewBtnText}>VIEW CHALLENGE BRIEF</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        {/* Right Side: Sidebar */}
        <View style={styles.sidebar}>
          
          {/* Resources Box */}
          <View style={styles.sidebarBox}>
            <View style={styles.sidebarBoxHeader}>
              <Archive color={colors.primary} size={24} style={{ marginRight: 12 }} />
              <Text style={styles.sidebarBoxTitle}>PARTICIPANT RESOURCES</Text>
            </View>

            {/* Resource 1 */}
            <View style={styles.resourceItem}>
              <View style={styles.resourceItemHeader}>
                <View style={styles.resourceIconBox}>
                  <FileText color={colors.textMuted} size={20} />
                </View>
                <View style={styles.resourceTextContent}>
                  <Text style={styles.resourceTitle}>PARTICIPANT TOOLKIT (PDF)</Text>
                  <Text style={styles.resourceDesc}>Essential guidelines, branding assets, and event rules.</Text>
                </View>
              </View>
              <Pressable style={styles.downloadBtn}>
                <Download color="#000" size={16} style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>DOWNLOAD TOOLKIT</Text>
              </Pressable>
            </View>

            {/* Resource 2 */}
            <View style={styles.resourceItem}>
              <View style={styles.resourceItemHeader}>
                <View style={styles.resourceIconBox}>
                  <LayoutTemplate color={colors.textMuted} size={20} />
                </View>
                <View style={styles.resourceTextContent}>
                  <Text style={styles.resourceTitle}>10-SLIDE PITCH TEMPLATE</Text>
                  <Text style={styles.resourceDesc}>The official pitch deck structure for final submissions.</Text>
                </View>
              </View>
              <Pressable style={styles.downloadBtn}>
                <Download color="#000" size={16} style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>DOWNLOAD TEMPLATE</Text>
              </Pressable>
            </View>

            {/* Resource 3 */}
            <View style={styles.resourceItem}>
              <View style={styles.resourceItemHeader}>
                <View style={styles.resourceIconBox}>
                  <TerminalSquare color={colors.textMuted} size={20} />
                </View>
                <View style={styles.resourceTextContent}>
                  <Text style={styles.resourceTitle}>NASA OPEN DATA API GUIDE</Text>
                  <Text style={styles.resourceDesc}>Technical walkthrough for connecting to NASA datasets.</Text>
                </View>
              </View>
              <Pressable style={styles.downloadBtn}>
                <Download color="#000" size={16} style={{ marginRight: 8 }} />
                <Text style={styles.downloadBtnText}>DOWNLOAD GUIDE</Text>
              </Pressable>
            </View>
            
          </View>

          {/* Tech Help Box */}
          <View style={styles.techHelpBox}>
            <Text style={styles.techHelpTitle}>Need technical help?</Text>
            <Text style={styles.techHelpDesc}>
              Our technical mentors are available 24/7 on the official Discord server during the hackathon.
            </Text>
            <Pressable style={styles.discordLink}>
              <Text style={styles.discordLinkText}>JOIN DISCORD SERVER</Text>
              <ArrowRight color={colors.primary} size={16} style={{ marginLeft: 6 }} />
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
  
  // Header Section
  headerSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: '5%',
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: isWeb && !isMobile ? 56 : 36,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 16,
  },
  headerTitleCyan: {
    color: colors.primary,
    textShadowColor: 'rgba(0, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 700,
  },
  searchContainer: {
    marginBottom: 24,
    maxWidth: 700,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1724',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    outlineStyle: 'none',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  filterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  filterTextActive: {
    color: '#000',
  },
  
  // Main Layout
  mainLayout: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    paddingHorizontal: '5%',
    paddingBottom: 80,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    gap: 40,
  },
  
  // Challenges Grid
  challengesGrid: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  challengeCard: {
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 30,
    width: isWeb && !isMobile ? 'calc(50% - 12px)' : '100%',
    minHeight: 380,
    display: 'flex',
  },
  cardHeader: {
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  diffTag: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
  catTag: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 32,
  },
  cardDesc: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 30,
  },
  viewBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  viewBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  
  // Sidebar
  sidebar: {
    flex: 1,
    gap: 24,
  },
  sidebarBox: {
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 30,
  },
  sidebarBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  sidebarBoxTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resourceItem: {
    marginBottom: 30,
  },
  resourceItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  resourceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceTextContent: {
    flex: 1,
  },
  resourceTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  resourceDesc: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  downloadBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  techHelpBox: {
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 30,
  },
  techHelpTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  techHelpDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  discordLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discordLinkText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
