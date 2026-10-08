import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';
import GlassCard from './GlassCard';
import { fonts } from '../theme/typography';


export default function StatsSection() {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);

  const stats = [
    { title: '500+', subtitle: 'HACKERS JOINED', tag: 'ISLAND-WIDE' },
    { title: '50+', subtitle: 'SCHOOLS & UNIS', tag: '9 PROVINCES' },
    { title: '2.5M', subtitle: 'LKR PRIZE POOL', tag: 'CASH & PERKS' },
    { title: '48H', subtitle: 'INNOVATION SPRINT', tag: 'GLOBAL HACK' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {stats.map((stat, index) => (
          <GlassCard key={index} style={styles.card}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{stat.tag}</Text>
            </View>
            <Text style={styles.title}>{stat.title}</Text>
            <Text style={styles.subtitle}>{stat.subtitle}</Text>
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
  container: {
    backgroundColor: '#070D1D',
    paddingVertical: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.15)',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 16,
    maxWidth: 1300,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: width > 900 ? 250 : width > 600 ? '45%' : '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
  },
  tagBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    fontFamily: fonts.display,
    color: colors.primary,
    marginBottom: 6,
    textShadow: '0px 0px 10px rgba(0, 229, 255, 0.4)',
  },
  subtitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.2,
    fontWeight: '700',
    textAlign: 'center',
  },
});
