import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Platform, Dimensions } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ContactPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Navbar />
      
      <View style={styles.header}>
        <Text style={styles.title}>
          CONTACT NASA SPACE APPS <Text style={styles.titleGlow}>SRI LANKA</Text>
        </Text>
        <Text style={styles.subtitle}>
          Questions? Reach out to our organizing committee in Kandy. We are{'\n'}
          here to help you launch your innovation journey.
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.leftColumn}>
          {/* Info Card */}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>EMAIL US</Text>
                <Text style={styles.infoValue}>info@nasaspaceapps.lk</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Ionicons name="location-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>LOCATION</Text>
                <Text style={styles.infoValue}>University of Peradeniya Campus, Kandy</Text>
                <Text style={styles.infoSubValue}>Central Province, Sri Lanka</Text>
              </View>
            </View>

            <Text style={[styles.infoLabel, { marginTop: 20, marginBottom: 10 }]}>CONNECT WITH US</Text>
            <View style={styles.socialIcons}>
              <View style={styles.socialBox}><Ionicons name="logo-facebook" size={16} color={colors.textMuted} /></View>
              <View style={styles.socialBox}><Ionicons name="logo-linkedin" size={16} color={colors.textMuted} /></View>
              <View style={styles.socialBox}><Ionicons name="logo-instagram" size={16} color={colors.textMuted} /></View>
              <View style={styles.socialBox}><Ionicons name="close" size={16} color={colors.textMuted} /></View>
            </View>
          </View>

          {/* Map Graphic Card */}
          <View style={styles.mapCard}>
            <View style={styles.mapGraphic}>
              {/* Simplified curves/lines representing map */}
              <View style={styles.mapCurve1} />
              <View style={styles.mapCurve2} />
              <View style={styles.mapNode} />
              <View style={styles.mapNodeLabelBox}>
                 <Text style={styles.mapNodeLabel}>HUB: KANDY</Text>
              </View>
            </View>
            <Text style={styles.mapFooterText}>
              <Text style={{color: '#4B5563'}}>COORD: 7.29° N, 80.63° E  |  </Text>
              <Text style={{color: '#059669'}}>STATUS: ACTIVE</Text>
            </Text>
          </View>
        </View>

        {/* Right Column Form */}
        <View style={[styles.card, styles.formCard]}>
          <Text style={styles.formTitle}>
            SEND US A <Text style={{ color: colors.primary }}>MESSAGE</Text>
          </Text>

          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <TextInput 
                style={styles.input} 
                placeholder="John Doe" 
                placeholderTextColor={colors.textMuted} 
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <TextInput 
                style={styles.input} 
                placeholder="john@example.com" 
                placeholderTextColor={colors.textMuted} 
              />
            </View>
          </View>

          <View style={[styles.inputGroup, { width: '100%' }]}>
            <Text style={styles.inputLabel}>SUBJECT</Text>
            <TextInput 
              style={styles.input} 
              placeholder="General Inquiry" 
              placeholderTextColor={colors.textMuted} 
            />
          </View>

          <View style={[styles.inputGroup, { width: '100%', flex: 1 }]}>
            <Text style={styles.inputLabel}>MESSAGE</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="How can we help you?" 
              placeholderTextColor={colors.textMuted} 
              multiline
              textAlignVertical="top"
            />
          </View>

          <Pressable style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SEND MESSAGE</Text>
            <Ionicons name="send-outline" size={16} color="#000" style={{ marginLeft: 8 }} />
          </Pressable>

          <Text style={styles.formFooterText}>
            OUR ORGANIZING COMMITTEE TYPICALLY RESPONDS WITHIN 24 HOURS.
          </Text>
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
  header: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  titleGlow: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  mainContent: {
    flexDirection: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
    paddingBottom: 60,
    gap: 20,
    alignItems: 'stretch',
  },
  leftColumn: {
    flex: 1,
    gap: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  infoSubValue: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    padding: 20,
    justifyContent: 'flex-end',
  },
  mapGraphic: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCurve1: {
    position: 'absolute',
    width: 300,
    height: 150,
    borderTopWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 150,
    top: 50,
    left: -50,
    opacity: 0.5,
  },
  mapCurve2: {
    position: 'absolute',
    width: 200,
    height: 100,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 100,
    bottom: 50,
    right: -20,
    opacity: 0.3,
  },
  mapNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOpacity: 1,
    shadowRadius: 10,
    position: 'absolute',
    top: '45%',
    left: '55%',
  },
  mapNodeLabelBox: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  mapNodeLabel: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  mapFooterText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  formCard: {
    flex: 1.5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
  },
  formRow: {
    flexDirection: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'row' : 'column',
    gap: 16,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  submitBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formFooterText: {
    color: colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 0.5,
  }
});
