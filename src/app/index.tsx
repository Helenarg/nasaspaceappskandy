import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import PageMeta from '../components/PageMeta';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ExpansionSection from '../components/ExpansionSection';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';

export default function LandingPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PageMeta
        title="NASA Space Apps Challenge Sri Lanka | Kandy 2026"
        description="Sri Lanka's gateway to space innovation. Join NASA Space Apps Kandy, 3-5 October 2026, and the all-island expansion across 9 provinces."
        path="/"
      />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ExpansionSection />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? 'transparent' : colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
