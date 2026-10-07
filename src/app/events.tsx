import React from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions, Pressable } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { Calendar, MapPin, ArrowRight, Rocket, BrainCircuit, Trophy, Clock, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 768;

export default function EventsPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE COUNTDOWN TO LAUNCH</Text>
        </View>
        
        <Text style={styles.heroTitle}>
          EVENT HUB &{'\n'}
          <Text style={styles.heroTitleCyan}>48-HOUR</Text> SCHEDULE
        </Text>
        
        <Text style={styles.heroSubtitle}>
          Join us for the world's largest annual hackathon dedicated to solving real-world{'\n'}
          problems with NASA data. The Kandy Hub is your portal to innovation.
        </Text>

        {/* Big Event Card */}
        <View style={styles.eventCard}>
          <View style={styles.eventCardContent}>
            
            <View style={styles.eventCardLeft}>
              <View style={styles.pillRow}>
                <View style={[styles.pill, styles.pillCyan]}>
                  <Text style={styles.pillTextBlack}>GLOBAL HACKATHON</Text>
                </View>
                <View style={[styles.pill, styles.pillDark]}>
                  <Text style={styles.pillTextWhite}>KANDY LOCAL</Text>
                </View>
              </View>

              <Text style={styles.eventTitle}>
                NASA SPACE APPS{'\n'}
                CHALLENGE KANDY{'\n'}
                2026
              </Text>

              <View style={styles.eventInfoList}>
                <View style={styles.eventInfoItem}>
                  <View style={styles.iconBox}>
                    <Calendar color={colors.primary} size={20} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>EVENT DATES</Text>
                    <Text style={styles.infoValue}>October 3–5, 2026</Text>
                  </View>
                </View>
                
                <View style={styles.eventInfoItem}>
                  <View style={styles.iconBox}>
                    <MapPin color={colors.secondary} size={20} />
                  </View>
                  <View>
                    <Text style={styles.infoLabel}>PRIMARY VENUE</Text>
                    <Text style={styles.infoValue}>Kandy Convention Center, Sri Lanka</Text>
                  </View>
                </View>
              </View>

              <Pressable style={styles.registerBtn}>
                <Text style={styles.registerBtnText}>REGISTER FOR EVENT</Text>
                <ArrowRight color="#000" size={18} style={{ marginLeft: 8 }} />
              </Pressable>
            </View>

            <View style={styles.countdownPanel}>
              <Text style={styles.countdownTitle}>STARTS IN</Text>
              
              <View style={styles.countdownGrid}>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>142</Text>
                  <Text style={styles.countdownLabel}>DAYS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>08</Text>
                  <Text style={styles.countdownLabel}>HOURS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>42</Text>
                  <Text style={styles.countdownLabel}>MINS</Text>
                </View>
                <View style={styles.countdownItem}>
                  <Text style={styles.countdownNumber}>15</Text>
                  <Text style={styles.countdownLabel}>SECS</Text>
                </View>
              </View>
              
              <Text style={styles.countdownStatus}>Current Status: Preparations Active</Text>
            </View>

          </View>
        </View>
      </View>

      {/* Milestones Section */}
      <View style={styles.milestonesSection}>
        <Text style={styles.sectionTitle}>HACKATHON MILESTONES</Text>
        <View style={styles.titleDivider} />

        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          
          {/* Milestone 1 */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineNode, styles.nodeSolidCyan]} />
            <View style={styles.timelineCard}>
              <View style={styles.timelineCardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Rocket color={colors.primary} size={24} style={{ marginRight: 12 }} />
                  <Text style={styles.timelineCardTitle}>Kickoff & Opening Ceremony</Text>
                </View>
                <View style={styles.timelinePill}>
                  <Text style={styles.timelinePillText}>DAY 1 • OCT 3</Text>
                </View>
              </View>
              
              <View style={styles.timelineTimeRow}>
                <Clock color={colors.secondary} size={16} />
                <Text style={styles.timelineTimeText}>9:00 AM - 12:00 PM</Text>
              </View>
              
              <Text style={styles.timelineCardDesc}>
                Welcome keynote, global theme introduction, team formation activities, and official venue tour. Start the journey with energy and fresh ideas.
              </Text>
            </View>
          </View>

          {/* Milestone 2 */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineNode, styles.nodeHollowCyan]} />
            <View style={styles.timelineCard}>
              <View style={styles.timelineCardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <BrainCircuit color={colors.primary} size={24} style={{ marginRight: 12 }} />
                  <Text style={styles.timelineCardTitle}>NASA Open Data & Mentorship</Text>
                </View>
                <View style={styles.timelinePill}>
                  <Text style={styles.timelinePillText}>DAY 2 • OCT 4</Text>
                </View>
              </View>
              
              <View style={styles.timelineTimeRow}>
                <Clock color={colors.secondary} size={16} />
                <Text style={styles.timelineTimeText}>10:00 AM - 6:00 PM</Text>
              </View>
              
              <Text style={styles.timelineCardDesc}>
                Technical deep-dives with NASA Open Data Experts. API workshops, one-on-one strategy sessions with mentors, and non-stop coding sprints.
              </Text>
            </View>
          </View>

          {/* Milestone 3 */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineNode, styles.nodeHollowOrange]} />
            <View style={styles.timelineCard}>
              <View style={styles.timelineCardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Trophy color={colors.secondary} size={24} style={{ marginRight: 12 }} />
                  <Text style={styles.timelineCardTitle}>Final Pitching & Award Ceremony</Text>
                </View>
                <View style={styles.timelinePillOrange}>
                  <Text style={styles.timelinePillTextOrange}>DAY 3 • OCT 5</Text>
                </View>
              </View>
              
              <View style={styles.timelineTimeRow}>
                <Clock color={colors.secondary} size={16} />
                <Text style={styles.timelineTimeText}>2:00 PM - 8:00 PM</Text>
              </View>
              
              <Text style={styles.timelineCardDesc}>
                The grand finale. Team presentations to the panel of judges, winner announcements across categories, and prize distributions for the top innovators.
              </Text>
            </View>
          </View>

        </View>
      </View>

      {/* Preparation Section */}
      <View style={styles.prepSection}>
        <Text style={styles.sectionTitle}>PREPARE FOR THE CHALLENGE</Text>
        <Text style={styles.prepSubtitle}>
          Join our free technical webinars to level up your skills before the big weekend.
        </Text>

        <View style={styles.webinarGrid}>
          {/* Webinar 1 */}
          <View style={styles.webinarCard}>
            <View style={styles.webinarHeader}>
              <View style={[styles.webinarAvatar, { backgroundColor: '#1C6B7A' }]}>
                 <User color="#FFF" size={24} />
              </View>
              <View style={styles.webinarLevelPillCyan}>
                <Text style={styles.webinarLevelTextCyan}>ADVANCED</Text>
              </View>
            </View>
            <Text style={styles.webinarTitle}>NASA Open Data API Masterclass</Text>
            <Text style={styles.webinarDate}>September 28 | 7:00 PM</Text>
            <Text style={styles.webinarDesc}>
              Learn how to fetch and parse large-scale datasets from NASA's Earth and Space APIs for high-performance apps.
            </Text>
            <Pressable style={styles.webinarBtn}>
              <Text style={styles.webinarBtnText}>[REGISTER SESSION]</Text>
            </Pressable>
          </View>

          {/* Webinar 2 */}
          <View style={styles.webinarCard}>
            <View style={styles.webinarHeader}>
              <View style={[styles.webinarAvatar, { backgroundColor: '#A04B3E' }]}>
                 <User color="#FFF" size={24} />
              </View>
              <View style={styles.webinarLevelPillDark}>
                <Text style={styles.webinarLevelTextGray}>INTERMEDIATE</Text>
              </View>
            </View>
            <Text style={styles.webinarTitle}>Climate Tech Deep Dive</Text>
            <Text style={styles.webinarDate}>September 30 | 6:30 PM</Text>
            <Text style={styles.webinarDesc}>
              Explore historical climate data trends and environmental sensor processing using Python and satellite imagery.
            </Text>
            <Pressable style={styles.webinarBtn}>
              <Text style={styles.webinarBtnText}>[REGISTER SESSION]</Text>
            </Pressable>
          </View>

          {/* Webinar 3 */}
          <View style={styles.webinarCard}>
            <View style={styles.webinarHeader}>
              <View style={[styles.webinarAvatar, { backgroundColor: '#3E7CA0' }]}>
                 <User color="#FFF" size={24} />
              </View>
              <View style={styles.webinarLevelPillDark}>
                <Text style={styles.webinarLevelTextGray}>BEGINNER</Text>
              </View>
            </View>
            <Text style={styles.webinarTitle}>AI/ML for Space Applications</Text>
            <Text style={styles.webinarDate}>October 1 | 8:00 PM</Text>
            <Text style={styles.webinarDesc}>
              An introduction to building simple machine learning models for celestial body detection and data prediction.
            </Text>
            <Pressable style={styles.webinarBtn}>
              <Text style={styles.webinarBtnText}>[REGISTER SESSION]</Text>
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
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 30,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  liveText: {
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
    lineHeight: isWeb && !isMobile ? 64 : 44,
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
    marginBottom: 60,
  },
  
  // Event Card
  eventCard: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: 'rgba(10, 18, 30, 0.8)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  eventCardContent: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
  },
  eventCardLeft: {
    flex: 1.2,
    padding: isWeb && !isMobile ? 60 : 30,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 12,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillCyan: {
    backgroundColor: colors.primary,
  },
  pillDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  pillTextBlack: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pillTextWhite: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  eventTitle: {
    fontSize: isWeb && !isMobile ? 36 : 28,
    fontWeight: '900',
    color: '#FFF',
    lineHeight: isWeb && !isMobile ? 42 : 34,
    marginBottom: 40,
  },
  eventInfoList: {
    gap: 24,
    marginBottom: 40,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  registerBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // Countdown Panel
  countdownPanel: {
    flex: 1,
    backgroundColor: '#111827',
    padding: isWeb && !isMobile ? 60 : 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: isWeb && !isMobile ? 1 : 0,
    borderTopWidth: isWeb && !isMobile ? 0 : 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  countdownTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 30,
  },
  countdownGrid: {
    flexDirection: 'row',
    gap: isWeb && !isMobile ? 24 : 12,
    marginBottom: 40,
  },
  countdownItem: {
    alignItems: 'center',
  },
  countdownNumber: {
    color: colors.primary,
    fontSize: isWeb && !isMobile ? 48 : 32,
    fontWeight: '300',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 8,
  },
  countdownLabel: {
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
  },
  countdownStatus: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  
  // Milestones Section
  milestonesSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  titleDivider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 2,
  },
  timelineContainer: {
    width: '100%',
    maxWidth: 800,
    position: 'relative',
    paddingLeft: isWeb && !isMobile ? 0 : 20,
  },
  timelineLine: {
    position: 'absolute',
    left: isWeb && !isMobile ? 24 : 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#1E2A3C', // subtle line
    // on web design it has a cyan glow, we'll just use a subtle color or cyan gradient
    // let's make the top part cyan
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: isWeb && !isMobile ? 80 : 30,
    marginBottom: 40,
  },
  timelineNode: {
    position: 'absolute',
    left: isWeb && !isMobile ? 15 : -9,
    top: 30,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    borderWidth: 3,
    zIndex: 2,
  },
  nodeSolidCyan: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  nodeHollowCyan: {
    borderColor: colors.primary,
  },
  nodeHollowOrange: {
    borderColor: colors.secondary,
  },
  timelineCard: {
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 30,
  },
  timelineCardHeader: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isWeb && !isMobile ? 'center' : 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  timelineCardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timelinePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
  },
  timelinePillText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  timelinePillOrange: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.2)',
  },
  timelinePillTextOrange: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  timelineTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineTimeText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  timelineCardDesc: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  
  // Prep Section
  prepSection: {
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  prepSubtitle: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 60,
    textAlign: 'center',
  },
  webinarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    maxWidth: 1200,
  },
  webinarCard: {
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 30,
    width: isWeb && !isMobile ? 350 : '100%',
  },
  webinarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  webinarAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webinarLevelPillCyan: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
  },
  webinarLevelTextCyan: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  webinarLevelPillDark: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  webinarLevelTextGray: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  webinarTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  webinarDate: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  webinarDesc: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 30,
    minHeight: 66, // to align buttons
  },
  webinarBtn: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  webinarBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
