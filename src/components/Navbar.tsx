import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../theme/colors';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoNasa}>NASA</Text>
        </View>
        <View>
          <Text style={styles.logoText}>nasaspaceapps<Text style={styles.logoLk}>.lk</Text></Text>
          <Text style={styles.logoSubtext}>KANDY LOCAL EVENT</Text>
        </View>
      </View>

      <View style={styles.navLinks}>
        {['About', 'Events', 'Challenges', 'Ambassadors', 'Sponsors', 'News'].map((link) => {
          const href = link === 'About' ? '/about' : link === 'Events' ? '/events' : link === 'Challenges' ? '/challenges' : link === 'Ambassadors' ? '/ambassadors' : link === 'Sponsors' ? '/sponsors' : link === 'News' ? '/news' : '#';
          return href !== '#' ? (
            <Link href={href as any} asChild key={link}>
              <Pressable style={styles.navLink}>
                <Text style={styles.navLinkText}>{link}</Text>
              </Pressable>
            </Link>
          ) : (
            <Pressable key={link} style={styles.navLink}>
              <Text style={styles.navLinkText}>{link}</Text>
            </Pressable>
          );
        })}
        <Link href="/contact" asChild>
          <Pressable style={styles.navLink}>
            <Text style={[styles.navLinkText, styles.navLinkActive]}>Contact</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/register" asChild>
        <Pressable style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>REGISTER NOW</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: Platform.OS === 'web' ? '5%' : 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoLk: {
    color: colors.primary,
  },
  logoSubtext: {
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
  },
  navLinks: {
    flexDirection: 'row',
    display: Platform.OS === 'web' ? 'flex' : 'none', // Hide on mobile for now
  },
  navLink: {
    marginHorizontal: 15,
  },
  navLinkText: {
    color: colors.text,
    fontSize: 14,
  },
  navLinkActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  registerBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  registerBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
