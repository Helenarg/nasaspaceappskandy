import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Modal,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { Link, usePathname } from 'expo-router';
import { colors } from '../theme/colors';
import FlagLK from './FlagLK';
import { fonts } from '../theme/typography';
import { Menu, X, Rocket } from './icons';
import { USE_NATIVE_DRIVER, useReducedMotion } from '../theme/motion';
import { useI18n } from '../i18n';
import LanguageToggle from './LanguageToggle';

const NAV_ITEMS = [
  { key: 'nav.about', href: '/about' },
  { key: 'nav.events', href: '/events' },
  { key: 'nav.challenges', href: '/challenges' },
  { key: 'nav.ambassadors', href: '/ambassadors' },
  { key: 'nav.join', href: '/join' },
  { key: 'nav.sponsors', href: '/sponsors' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.contact', href: '/contact' },
] as const;

// Below this the 8 links no longer fit beside the logo and CTA.
const DESKTOP_NAV_BREAKPOINT = 1100;

export default function Navbar() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const styles = useMemo(() => makeStyles(width), [width]);
  const reducedMotion = useReducedMotion();
  const { t } = useI18n();
  const isDesktop = width >= DESKTOP_NAV_BREAKPOINT;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(0)).current;

  // Drawer slides down from the top; backdrop fades with the same value.
  useEffect(() => {
    if (reducedMotion) {
      drawerAnim.setValue(mobileMenuOpen ? 1 : 0);
      return;
    }
    const anim = Animated.timing(drawerAnim, {
      toValue: mobileMenuOpen ? 1 : 0,
      duration: mobileMenuOpen ? 240 : 180,
      easing: mobileMenuOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: USE_NATIVE_DRIVER,
    });
    anim.start();
    return () => anim.stop();
  }, [mobileMenuOpen, drawerAnim, reducedMotion]);

  // A wide resize while the drawer is open would leave it stranded over the desktop nav.
  useEffect(() => {
    if (isDesktop && mobileMenuOpen) setMobileMenuOpen(false);
  }, [isDesktop, mobileMenuOpen]);

  const drawerTranslate = drawerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 0],
  });

  return (
    <View style={styles.container}>
      {/* Brand Logo */}
      <Link href="/" asChild>
        <Pressable
          style={styles.logoContainer}
          accessibilityRole="link"
          accessibilityLabel="nasaspaceapps.lk home"
        >
          <View style={styles.logoBox}>
            <Text style={styles.logoNasa}>NASA</Text>
          </View>
          <View style={styles.logoTextBlock}>
            <View style={styles.logoTitleRow}>
              <Text style={styles.logoText} numberOfLines={1}>
                nasaspaceapps<Text style={styles.logoLk}>.lk</Text>
              </Text>
              <FlagLK width={18} />
            </View>
            <Text style={styles.logoSubtext} numberOfLines={1}>
              {t('nav.tagline')}
            </Text>
          </View>
        </Pressable>
      </Link>

      {/* Desktop Navigation Links */}
      {isDesktop && (
        <View style={styles.desktopNav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href as any} asChild key={item.key}>
                <Pressable
                  style={styles.navLink}
                  accessibilityRole="link"
                  accessibilityState={{ selected: isActive }}
                >
                  {({ hovered, pressed }: any) => (
                    <>
                      <Text
                        style={[
                          styles.navLinkText,
                          (hovered || pressed) && styles.navLinkTextHovered,
                          isActive && styles.navLinkActiveText,
                        ]}
                      >
                        {t(item.key)}
                      </Text>
                      {isActive && <View style={styles.activeIndicator} />}
                    </>
                  )}
                </Pressable>
              </Link>
            );
          })}
        </View>
      )}

      {/* Right CTA + mobile trigger */}
      <View style={styles.rightAction}>
        {isDesktop && <LanguageToggle compact />}
        {width >= 600 && (
          <Link href="/register" asChild>
            <Pressable accessibilityRole="button" accessibilityLabel="Register for the hackathon">
              {({ hovered, pressed }: any) => (
                <View
                  style={[
                    styles.registerBtn,
                    hovered && styles.registerBtnHovered,
                    pressed && styles.registerBtnPressed,
                  ]}
                >
                  <Rocket size={14} color="#050912" style={{ marginRight: 6 }} />
                  <Text style={styles.registerBtnText}>{t('nav.register')}</Text>
                </View>
              )}
            </Pressable>
          </Link>
        )}

        {!isDesktop && (
          <Pressable
            style={({ pressed }: any) => [styles.mobileMenuButton, pressed && styles.mobileMenuButtonPressed]}
            onPress={() => setMobileMenuOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            accessibilityState={{ expanded: mobileMenuOpen }}
            hitSlop={8}
          >
            {mobileMenuOpen ? (
              <X size={24} color={colors.primary} />
            ) : (
              <Menu size={24} color={colors.text} />
            )}
          </Pressable>
        )}
      </View>

      {/* Mobile Drawer Overlay */}
      <Modal
        visible={mobileMenuOpen}
        transparent
        animationType="none"
        onRequestClose={() => setMobileMenuOpen(false)}
      >
        <Animated.View style={[styles.modalBackdrop, { opacity: drawerAnim }]}>
          {/* Tapping outside closes, matching standard drawer behaviour */}
          <Pressable
            accessibilityRole="button"
            style={StyleSheet.absoluteFill}
            onPress={() => setMobileMenuOpen(false)}
            accessibilityLabel="Close navigation menu"
          />

          <Animated.View
            style={[styles.mobileDrawer, { transform: [{ translateY: drawerTranslate }] }]}
          >
            <View style={styles.mobileDrawerHeader}>
              <View style={styles.logoContainer}>
                <View style={styles.logoBox}>
                  <Text style={styles.logoNasa}>NASA</Text>
                </View>
                <Text style={styles.logoText}>
                  nasaspaceapps<Text style={styles.logoLk}>.lk</Text>
                </Text>
              </View>
              <Pressable
                onPress={() => setMobileMenuOpen(false)}
                style={styles.drawerCloseButton}
                accessibilityRole="button"
                accessibilityLabel="Close navigation menu"
                hitSlop={8}
              >
                <X size={24} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.drawerLanguageRow}>
              <LanguageToggle />
            </View>

            <View style={styles.mobileNavLinks}>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href as any} asChild key={item.key}>
                    <Pressable
                      onPress={() => setMobileMenuOpen(false)}
                      accessibilityRole="link"
                      accessibilityState={{ selected: isActive }}
                    >
                      {({ pressed, hovered }: any) => (
                        <View
                          style={[
                            styles.mobileNavItem,
                            (pressed || hovered) && styles.mobileNavItemPressed,
                            isActive && styles.mobileNavItemActive,
                          ]}
                        >
                          <Text
                            style={[styles.mobileNavText, isActive && styles.mobileNavTextActive]}
                          >
                            {t(item.key)}
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </Link>
                );
              })}
            </View>

            <View style={styles.mobileDrawerFooter}>
              <Link href="/register" asChild>
                <Pressable onPress={() => setMobileMenuOpen(false)} accessibilityRole="button">
                  {({ pressed }: any) => (
                    <View style={[styles.mobileRegisterBtn, pressed && styles.registerBtnPressed]}>
                      <Rocket size={16} color="#050912" style={{ marginRight: 8 }} />
                      <Text style={styles.mobileRegisterBtnText}>{t('nav.registerLong')}</Text>
                    </View>
                  )}
                </Pressable>
              </Link>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const makeStyles = (width: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: width > 900 ? '5%' : 16,
      backgroundColor: 'rgba(5, 9, 18, 0.92)',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.08)',
      zIndex: 100,
      // Keeps the nav in view while the page scrolls (web only; native uses the drawer).
      ...(Platform.OS === 'web'
        ? ({ position: 'sticky', top: 0, backdropFilter: 'blur(14px)' } as any)
        : null),
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
    },
    logoContainerActive: {
      opacity: 0.8,
    },
    logoTextBlock: {
      flexShrink: 1,
    },
    logoBox: {
      borderWidth: 1,
      borderColor: 'rgba(0, 229, 255, 0.3)',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      marginRight: 10,
      backgroundColor: 'rgba(0, 229, 255, 0.08)',
    },
    logoNasa: {
      color: colors.text,
      fontSize: 11,
      fontWeight: '900',
      fontFamily: fonts.display,
      letterSpacing: 1.5,
    },
    logoTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    logoText: {
      color: colors.text,
      fontSize: width > 400 ? 18 : 15,
      fontWeight: '800',
      fontFamily: fonts.display,
      letterSpacing: -0.3,
    },
    logoLk: {
      color: colors.primary,
    },
    flagIcon: {
      fontFamily: fonts.body,
      fontSize: 14,
    },
    logoSubtext: {
      fontFamily: fonts.bodyMedium,
      color: colors.textMuted,
      fontSize: 11,
      letterSpacing: 1.2,
      fontWeight: '600',
    },
    desktopNav: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flexShrink: 1,
    },
    navLink: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      position: 'relative',
      alignItems: 'center',
    },
    navLinkText: {
      fontFamily: fonts.bodyMedium,
      color: colors.textMuted,
      fontSize: 13,
      fontWeight: '500',
      ...(Platform.OS === 'web' ? ({ transition: 'color 150ms ease' } as any) : null),
    },
    navLinkTextHovered: {
      color: colors.text,
    },
    navLinkActiveText: {
      color: colors.primary,
      fontWeight: '700',
    },
    activeIndicator: {
      position: 'absolute',
      bottom: -4,
      width: 16,
      height: 2,
      backgroundColor: colors.primary,
      borderRadius: 1,
      boxShadow: '0px 0px 6px rgba(0, 229, 255, 1)',
    },
    rightAction: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    registerBtn: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 22,
      boxShadow: '0px 0px 12px rgba(0, 229, 255, 0.6)',
      elevation: 4,
      ...(Platform.OS === 'web'
        ? ({ transition: 'transform 150ms ease, filter 150ms ease' } as any)
        : null),
    },
    registerBtnHovered: {
      ...(Platform.OS === 'web' ? ({ filter: 'brightness(1.1)' } as any) : null),
      transform: [{ scale: 1.03 }],
    },
    registerBtnPressed: {
      transform: [{ scale: 0.97 }],
      opacity: 0.9,
    },
    registerBtnText: {
      color: '#050912',
      fontWeight: '800',
      fontFamily: fonts.display,
      fontSize: 12,
      letterSpacing: 0.8,
    },
    mobileMenuButton: {
      // 44pt minimum touch target
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    mobileMenuButtonPressed: {
      backgroundColor: 'rgba(0, 229, 255, 0.15)',
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      justifyContent: 'flex-start',
    },
    mobileDrawer: {
      backgroundColor: '#0A0F1F',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 229, 255, 0.2)',
      paddingTop: 50,
      paddingBottom: 24,
      paddingHorizontal: 20,
      maxHeight: '90%',
    },
    mobileDrawerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    drawerCloseButton: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    drawerLanguageRow: {
      paddingTop: 16,
      alignItems: 'flex-start',
    },
    mobileNavLinks: {
      paddingVertical: 16,
      gap: 6,
    },
    mobileNavItem: {
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 8,
    },
    mobileNavItemPressed: {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
    mobileNavItemActive: {
      backgroundColor: 'rgba(0, 229, 255, 0.1)',
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
    },
    mobileNavText: {
      fontFamily: fonts.bodyMedium,
      color: colors.textMuted,
      fontSize: 16,
      fontWeight: '500',
    },
    mobileNavTextActive: {
      color: colors.primary,
      fontWeight: '700',
    },
    mobileDrawerFooter: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    mobileRegisterBtn: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 12,
      boxShadow: '0px 0px 10px rgba(0, 229, 255, 0.5)',
    },
    mobileRegisterBtnText: {
      color: '#050912',
      fontWeight: '800',
      fontFamily: fonts.display,
      fontSize: 14,
      letterSpacing: 0.8,
    },
  });
