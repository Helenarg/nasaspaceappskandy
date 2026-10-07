import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import SriLankaShape from './SriLankaShape';

export default function HeroSection() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.taglineBox}>
          <Text style={styles.taglineText}>
            <Text style={styles.taglineDot}>• </Text>
            THE WORLD'S LARGEST ANNUAL HACKATHON
          </Text>
        </View>

        <Text style={styles.title}>
          SRI LANKA'S{'\n'}
          <Text style={styles.titleGlow}>GATEWAY</Text> TO{'\n'}
          SPACE{'\n'}
          INNOVATION
        </Text>

        <Text style={styles.subtitle}>
          Official Home of NASA Space Apps Kandy & All-Island{'\n'}
          Expansion. Join a global community of innovators using{'\n'}
          NASA's open data to solve earthly problems.
        </Text>

        <View style={styles.buttonGroup}>
          <Link href="/register" asChild>
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>JOIN HACKATHON</Text>
              <Ionicons name="rocket-outline" size={18} color="#000" style={{ marginLeft: 8 }} />
            </Pressable>
          </Link>
          
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>EXPLORE CHALLENGES</Text>
          </Pressable>
        </View>
      </View>

      {/* Visualization Graphic */}
      <View style={styles.graphicContainer}>
        <View style={styles.orbit1}>
          <View style={styles.shapeWrapper}>
            <SriLankaShape />
            
            {/* Small scattered cyan dots */}
            <View style={[styles.cyanDot, { top: 70, right: 10 }]} />
            <View style={[styles.cyanDot, { bottom: 120, right: 40 }]} />
            <View style={[styles.cyanDot, { bottom: 50, left: 10 }]} />

            {/* Kandy Hub Node */}
            <View style={styles.kandyHubContainer}>
              <View style={styles.coreNode}>
                <View style={styles.coreNodeInner} />
              </View>
              <Text style={styles.coreNodeText}>KANDY HUB</Text>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
    paddingVertical: 60,
    alignItems: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'center' : 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    zIndex: 10,
  },
  taglineBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  taglineText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  taglineDot: {
    color: colors.primary,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 72 : 48,
    fontWeight: '900',
    color: colors.text,
    lineHeight: Platform.OS === 'web' ? 80 : 56,
    marginBottom: 30,
  },
  titleGlow: {
    color: colors.primary,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textMuted,
    lineHeight: 28,
    marginBottom: 40,
  },
  buttonGroup: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 16,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  primaryBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    width: '100%',
    marginTop: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 0 : 40,
  },
  orbit1: {
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeWrapper: {
    width: 250,
    height: 380,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cyanDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  kandyHubContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 230, 
    left: '50%',
    transform: [{ translateX: -12 }], // 24px node, so -12 is dead center. 
  },
  coreNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  coreNodeInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  coreNodeText: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});
