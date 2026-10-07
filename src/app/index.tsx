import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ExpansionSection from '../components/ExpansionSection';
import Footer from '../components/Footer';
import { colors } from '../theme/colors';

export default function LandingPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
