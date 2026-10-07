import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Dimensions, Pressable, TextInput } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { Award, Crown, Users, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 1024;

export default function AmbassadorsPage() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>
          LEAD THE SPACE{'\n'}
          <Text style={styles.headerTitleCyan}>REVOLUTION</Text> ON YOUR CAMPUS
        </Text>
        <Text style={styles.headerSubtitle}>
          Become an official NASA Space Apps Ambassador and inspire the next generation of{'\n'}
          space innovators across Sri Lanka.
        </Text>
      </View>

      {/* Main Content Layout */}
      <View style={styles.mainLayout}>
        
        {/* Left Side: Benefits List */}
        <View style={styles.benefitsColumn}>
          
          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Award color={colors.primary} size={28} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Official NASA Space Apps Certificate</Text>
              <Text style={styles.benefitDesc}>
                Recognized globally as an official NASA Space Apps ambassador with credentials verified
                by NASA headquarters, boosting your academic and professional profile.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Crown color={colors.primary} size={28} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>VIP Event Access</Text>
              <Text style={styles.benefitDesc}>
                Priority access to all NASA Space Apps events, exclusive mentorship sessions, and behind-
                the-scenes opportunities with industry experts and space agencies.
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.iconBox}>
              <Users color={colors.primary} size={28} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Leadership Network</Text>
              <Text style={styles.benefitDesc}>
                Join a curated community of 500+ campus leaders, mentors, and innovators across South
                Asia. Build lasting connections in the tech and space ecosystem.
              </Text>
            </View>
          </View>
          
        </View>

        {/* Right Side: Application Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Apply as Ambassador</Text>
          <Text style={styles.formSubtitle}>COMPLETE THE FORM BELOW TO JOIN OUR MISSION</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="Enter your full name" 
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SCHOOL / UNIVERSITY</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="Your educational institution" 
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>DISTRICT / PROVINCE</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="Select District" 
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>YEAR / GRADE</Text>
            <TextInput 
              style={styles.inputField} 
              placeholder="e.g. 1st Year, Grade 12" 
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>WHY BECOME AN AMBASSADOR?</Text>
            <TextInput 
              style={[styles.inputField, styles.textArea]} 
              placeholder="Tell us about your motivation..." 
              placeholderTextColor={colors.textMuted}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Pressable style={styles.checkboxRow} onPress={() => setIsChecked(!isChecked)}>
            <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
              {isChecked && <Check color="#000" size={14} />}
            </View>
            <Text style={styles.checkboxText}>I agree to the Ambassador Terms & Conditions</Text>
          </Pressable>

          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT APPLICATION</Text>
          </Pressable>
          
          <Text style={styles.footerNote}>WE'LL REVIEW YOUR APPLICATION AND CONTACT YOU WITHIN 48 HOURS</Text>

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
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: '5%',
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: isWeb && !isMobile ? 52 : 36,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 20,
    lineHeight: isWeb && !isMobile ? 60 : 44,
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
    maxWidth: 700,
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
  
  // Benefits Column
  benefitsColumn: {
    flex: 1.2,
    gap: 20,
  },
  benefitCard: {
    backgroundColor: 'rgba(10, 18, 30, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  benefitDesc: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  
  // Form Container
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(10, 18, 30, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: isWeb && !isMobile ? 40 : 20,
  },
  formTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 32,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFF',
    fontSize: 14,
    outlineStyle: 'none', // for web
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  checkboxActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  checkboxText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    marginBottom: 24,
  },
  submitBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerNote: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
});
