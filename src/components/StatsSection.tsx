import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';

export default function StatsSection() {
  const stats = [
    { title: '500+', subtitle: 'HACKERS JOINED' },
    { title: '50+', subtitle: 'SCHOOLS & UNIS' },
    { title: '2.5M', subtitle: 'LKR PRIZE POOL' },
    { title: '48H', subtitle: 'INNOVATION SPRINT' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{stat.title}</Text>
            <Text style={styles.subtitle}>{stat.subtitle}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#070C16', // slightly different bg for the middle strip
    paddingVertical: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.1)', // Subtle cyan border
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // Left border highlight
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: Platform.OS === 'web' ? 250 : '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    letterSpacing: 1,
    fontWeight: '600',
  },
});
