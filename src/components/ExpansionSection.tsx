import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ExpansionSection() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Kandy 2026:{'\n'}
            Anchoring{'\n'}
            <Text style={styles.highlight}>National Expansion</Text>
          </Text>
          
          <View style={styles.divider} />

          <Text style={styles.description}>
            The Kandy Hub serves as the central command for our{'\n'}
            national roadmap. By 2026, we aim to establish innovation{'\n'}
            nodes in all 9 provinces, connecting every district to the{'\n'}
            NASA Space Apps ecosystem.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color={colors.primary} style={styles.icon} />
              <View>
                <Text style={styles.featureTitle}>Strategic Core Node</Text>
                <Text style={styles.featureDesc}>Kandy leads technical mentorship and global standards.</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color={colors.primary} style={styles.icon} />
              <View>
                <Text style={styles.featureTitle}>Province Networking</Text>
                <Text style={styles.featureDesc}>Connecting Jaffna, Matara, Colombo, and beyond through unified data{'\n'}access.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Graphic Placeholder */}
        <View style={styles.graphicContainer}>
           <View style={styles.orbitGraphic}>
             {/* Base circles */}
             <View style={styles.circleLarge} />
             <View style={styles.circleMedium} />
             <View style={styles.circleSmall} />
             
             {/* Center Node */}
             <View style={styles.centerNode} />
             
             {/* Connecting Lines and Nodes (Simplified for placeholder) */}
             <Text style={[styles.nodeLabel, { top: '30%', left: '10%', color: colors.primary }]}>NORTHERN</Text>
             <Text style={[styles.nodeLabel, { top: '80%', left: '20%', color: colors.primary }]}>WESTERN</Text>
             <Text style={[styles.nodeLabel, { top: '40%', right: '10%', color: colors.primary }]}>EASTERN</Text>
             <Text style={[styles.nodeLabel, { bottom: '15%', right: '20%', color: colors.secondary }]}>SOUTHERN</Text>
           </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
    paddingVertical: 80,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 30,
    flexDirection: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'row' : 'column',
    padding: Platform.OS === 'web' ? 60 : 30,
    alignItems: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 'center' : 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 36,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: Platform.OS === 'web' ? 56 : 42,
  },
  highlight: {
    color: colors.secondary,
  },
  divider: {
    height: 4,
    width: 60,
    backgroundColor: colors.secondary,
    marginTop: 20,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 26,
    marginBottom: 40,
  },
  featureList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'web' && Dimensions.get('window').width > 768 ? 0 : 40,
  },
  orbitGraphic: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleLarge: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  circleMedium: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  circleSmall: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  centerNode: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  nodeLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});
