import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { CheckCircle2, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 768;

export default function AboutPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          ABOUT NASA SPACE APPS <Text style={styles.heroTitleCyan}>SRI LANKA</Text>
        </Text>
        <View style={styles.heroDivider} />
        <Text style={styles.heroDescription}>
          NASA Space Apps is the world's largest annual hackathon. In Sri Lanka, the Kandy Local{isWeb && !isMobile ? '\n' : ' '}
          Event serves as the strategic core, anchoring a national roadmap to foster space innovation{isWeb && !isMobile ? '\n' : ' '}
          and technological excellence across the entire island.
        </Text>
      </View>

      {/* Strategic Vision Section */}
      <View style={styles.visionSection}>
        <View style={styles.visionGraphicContainer}>
          <View style={styles.visionGraphicMock}>
            <View style={styles.mockWaveContainer}>
              <View style={styles.mockCircle} />
              <View style={styles.mockCenterBox} />
              <View style={styles.mockLineHorizontal} />
              <View style={styles.mockLineVertical} />
              <View style={[styles.mockDot, { top: '40%', left: '30%', backgroundColor: colors.secondary }]} />
              <View style={[styles.mockDot, { bottom: '30%', right: '35%', backgroundColor: colors.primary }]} />
              <View style={[styles.mockDot, { bottom: '25%', left: '15%', backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.8, shadowRadius: 10, shadowOffset: {width:0, height:0} }]} />
            </View>
            <View style={styles.mockFooter}>
              <Text style={styles.mockText}>SIGNAL STRENGTH: 98%</Text>
              <Text style={styles.mockText}>DATA SYNC: ACTIVE</Text>
            </View>
          </View>
        </View>

        <View style={styles.visionContent}>
          <Text style={styles.visionTitle}>
            Strategic Vision for{'\n'}
            <Text style={styles.visionTitleCyan}>.lk Domain</Text> Dominance
          </Text>
          <View style={styles.visionDivider} />
          
          <Text style={styles.visionDescription}>
            Our mission is to establish Sri Lanka as a regional leader in space-
            tech innovation. By leveraging the NASA Open Data platform, we
            empower local talent to build world-class solutions for global
            challenges.
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <CheckCircle2 color={colors.primary} size={22} style={styles.featureIcon} />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Kandy as Central Innovation Hub</Text>
                <Text style={styles.featureDesc}>Anchoring the technical infrastructure and global partnerships from our historic technological center.</Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <CheckCircle2 color={colors.primary} size={22} style={styles.featureIcon} />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>9-Province Network Connectivity</Text>
                <Text style={styles.featureDesc}>Expanding participation to all 9 provinces through dedicated school and campus ambassador programs.</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <CheckCircle2 color={colors.primary} size={22} style={styles.featureIcon} />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>UNESCO-Grade Technical Leadership</Text>
                <Text style={styles.featureDesc}>Collaborating with industry experts to maintain high-fidelity mentorship and judging standards.</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Organizing Committee Section */}
      <View style={styles.committeeSection}>
        <Text style={styles.committeeTitle}>
          MEET OUR <Text style={styles.committeeTitleCyan}>ORGANIZING COMMITTEE</Text>
        </Text>
        <Text style={styles.committeeSubtitle}>
          THE VISIONARIES BEHIND THE SRI LANKAN SPACE TECH REVOLUTION
        </Text>

        <View style={styles.gridContainer}>
          {[
            { name: 'Sandaruwan Perera', role: 'LEAD ORGANIZER', highlight: false },
            { name: 'Chamindu Herath', role: 'TECHNICAL LEAD', highlight: false },
            { name: 'Tharushi Silva', role: 'COMMUNICATIONS DIRECTOR', highlight: true },
            { name: 'Dilantha Bandara', role: 'OUTREACH MANAGER', highlight: false },
          ].map((person, index) => (
            <View key={index} style={[styles.card, person.highlight && styles.cardHighlight]}>
              <View style={styles.avatar}>
                <User color={colors.textMuted} size={40} />
              </View>
              <Text style={styles.cardName}>{person.name}</Text>
              <Text style={styles.cardRole}>{person.role}</Text>
              <View style={styles.linkedinBtn}>
                <Text style={styles.linkedinText}>in</Text>
              </View>
            </View>
          ))}
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: isWeb && !isMobile ? 48 : 32,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  heroTitleCyan: {
    color: colors.primary,
    textShadowColor: 'rgba(0, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  heroDivider: {
    width: 60,
    height: 4,
    backgroundColor: '#1C6B7A', // darker cyan for the line
    marginVertical: 30,
    borderRadius: 2,
  },
  heroDescription: {
    color: colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 800,
  },
  
  visionSection: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    paddingHorizontal: '10%',
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1400,
    alignSelf: 'center',
  },
  visionGraphicContainer: {
    flex: 1,
    width: '100%',
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isWeb && !isMobile ? 0 : 40,
  },
  visionGraphicMock: {
    width: 350,
    height: 350,
    backgroundColor: '#070C15',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 30,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  mockWaveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mockCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)', // subtle orange
    position: 'absolute',
  },
  mockLineHorizontal: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
  },
  mockLineVertical: {
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
  },
  mockCenterBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    position: 'absolute',
  },
  mockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
  mockFooter: {
    marginTop: 'auto',
  },
  mockText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
    marginBottom: 4,
  },
  
  visionContent: {
    flex: 1,
    paddingLeft: isWeb && !isMobile ? 60 : 0,
  },
  visionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 48,
  },
  visionTitleCyan: {
    color: colors.primary,
  },
  visionDivider: {
    width: 50,
    height: 4,
    backgroundColor: colors.secondary,
    marginVertical: 20,
    borderRadius: 2,
  },
  visionDescription: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 30,
    maxWidth: 500,
  },
  featureList: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    marginTop: 2,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featureDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  
  committeeSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  committeeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  committeeTitleCyan: {
    color: colors.primary,
  },
  committeeSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 15,
    marginBottom: 60,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
  },
  card: {
    backgroundColor: '#0A111D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 30,
    width: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  cardHighlight: {
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardRole: {
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 25,
    textAlign: 'center',
  },
  linkedinBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  linkedinText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
});
