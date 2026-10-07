import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 1024;

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        
        <View style={styles.leftCol}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoNasa}>NASA</Text>
            </View>
            <Text style={styles.logoText}>nasaspaceapps<Text style={styles.logoLk}>.lk</Text></Text>
          </View>
          <Text style={styles.subtitle}>
            Sri Lanka's official gateway to NASA's global{'\n'}
            hackathon. Empowering the next generation of{'\n'}
            space innovators since 2021.
          </Text>
          <View style={styles.socialIcons}>
            <Ionicons name="logo-facebook" size={20} color={colors.textMuted} style={styles.icon} />
            <Ionicons name="logo-linkedin" size={20} color={colors.textMuted} style={styles.icon} />
            <Ionicons name="logo-instagram" size={20} color={colors.textMuted} style={styles.icon} />
            <Ionicons name="close" size={20} color={colors.textMuted} style={styles.icon} />
          </View>
        </View>

        <View style={styles.linksColContainer}>
          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>QUICK LINKS</Text>
            <Text style={styles.linkText}>About NASA Apps</Text>
            <Text style={styles.linkText}>Events Hub</Text>
            <Text style={styles.linkText}>Open Challenges</Text>
            <Text style={styles.linkText}>Sponsorships</Text>
          </View>

          <View style={styles.linkColumn}>
            <Text style={styles.columnTitle}>SUPPORT</Text>
            <Text style={styles.linkText}>Contact Us</Text>
            <Text style={[styles.linkText, { color: colors.primary }]}>FAQ Hub</Text>
            <Text style={styles.linkText}>Join as Mentor</Text>
          </View>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.copyright}>© 2024 NASA SPACE APPS SRI LANKA{'\n'}KANDY ORGANIZING COMMITTEE</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03060C', 
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 60,
    paddingHorizontal: '5%',
  },
  topRow: {
    flexDirection: isWeb && !isMobile ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isWeb && !isMobile ? 'flex-start' : 'center',
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
    gap: 40,
  },
  leftCol: {
    flex: 1,
    alignItems: isWeb && !isMobile ? 'flex-start' : 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 6,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#111',
  },
  logoNasa: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoLk: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: isWeb && !isMobile ? 'left' : 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    marginRight: 8,
  },
  linksColContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: isWeb && !isMobile ? 'center' : 'space-around',
    width: '100%',
    gap: 60,
  },
  linkColumn: {
    alignItems: 'flex-start',
  },
  columnTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 16,
  },
  rightCol: {
    flex: 1,
    alignItems: isWeb && !isMobile ? 'flex-end' : 'center',
    justifyContent: 'flex-end',
    paddingTop: isWeb && !isMobile ? 100 : 0, // align text to bottom
  },
  copyright: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    letterSpacing: 1,
    textAlign: isWeb && !isMobile ? 'right' : 'center',
    lineHeight: 16,
  },
});
