import { Pressable } from './LocalizedPressable';
import { useViewport } from '../theme/useViewport';
import React, { useState } from 'react';
import { Link, usePathname } from 'expo-router';
import { Modal, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from './LocalizedText';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import { useI18n } from '../i18n';
import { useReducedMotion } from '../theme/motion';
import BrandLogo from './BrandLogo';
import LanguageToggle from './LanguageToggle';
import { ArrowRight, Menu, X } from './icons';
import { SPACE_APPS_EVENT } from '../content/event';

const NAV_ITEMS = [
  { key: 'nav.about', href: '/about' }, { key: 'nav.events', href: '/events' },
  { key: 'nav.challenges', href: '/challenges' }, { key: 'nav.ambassadors', href: '/ambassadors' },
  { key: 'nav.join', href: '/join' }, { key: 'nav.sponsors', href: '/sponsors' },
  { key: 'nav.news', href: '/news' }, { key: 'nav.contact', href: '/contact' },
] as const;

export default function Navbar() {
  const { width } = useViewport();
  const pathname = usePathname();
  const { t, lang } = useI18n();
  const desktop = width >= 1440 && lang === 'en';
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  return <View {...(Platform.OS === 'web' ? { role: 'banner' as const } : {})} style={styles.shell} onLayout={() => { if (desktop && open) setOpen(false); }}>
    <View style={[styles.inner, layout.container(width)]}>
      <Link href="/" asChild><Pressable accessibilityRole="link" accessibilityLabel="NASA Space Apps Kandy home" style={styles.brand}>
        <BrandLogo compact={width < 600} />
        <View style={[styles.local, width < 380 && { display: 'none' }]}><Text style={styles.localTitle}>SRI LANKA</Text><Text style={styles.localSubtitle}>KANDY LOCAL EVENT</Text></View>
      </Pressable></Link>
      {desktop && <View {...(Platform.OS === 'web' ? { role: 'navigation' as const, 'aria-label': t('nav.openMenu') } : {})} style={styles.links}>{NAV_ITEMS.map(item => <Link key={item.key} href={item.href} asChild>
        <Pressable accessibilityRole="link" {...(Platform.OS === 'web' ? { 'aria-current': pathname === item.href ? 'page' as const : undefined } : { accessibilityState: { selected: pathname === item.href } })} style={styles.link}>
          <Text style={[styles.linkText, pathname === item.href && styles.active]}>{t(item.key)}</Text>
        </Pressable>
      </Link>)}</View>}
      <View style={styles.actions}>
        {width >= 900 && <LanguageToggle compact />}
        {width >= 600 && <Link href={SPACE_APPS_EVENT.officialUrl} asChild><Pressable style={styles.register} accessibilityRole="link">
          <Text style={styles.registerText}>{t('nav.register')}</Text><ArrowRight size={15} color={colors.ink} />
        </Pressable></Link>}
        {!desktop && <Pressable style={styles.menu} accessibilityRole="button" accessibilityLabel={t('nav.openMenu')}
          accessibilityState={{ expanded: open }} aria-expanded={open} onPress={() => setOpen(true)}><Menu color={colors.text} size={24} /></Pressable>}
      </View>
    </View>
    <Modal accessibilityLabel={t('nav.openMenu')} visible={open && !desktop} transparent animationType={reduced ? 'none' : 'fade'} onRequestClose={() => setOpen(false)}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel={t('nav.closeMenu')} onPress={() => setOpen(false)} />
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}><BrandLogo compact /><Pressable style={styles.menu} accessibilityRole="button"
            accessibilityLabel={t('nav.closeMenu')} onPress={() => setOpen(false)}><X size={24} color={colors.text} /></Pressable></View>
          <ScrollView contentContainerStyle={styles.drawerContent}>
            <LanguageToggle />
            {NAV_ITEMS.map((item, index) => <Link href={item.href} key={item.key} asChild><Pressable onPress={() => setOpen(false)}
              style={styles.drawerLink} accessibilityRole="link" {...(Platform.OS === 'web' ? { 'aria-current': pathname === item.href ? 'page' as const : undefined } : { accessibilityState: { selected: pathname === item.href } })}>
              <Text style={styles.linkIndex}>0{index + 1}</Text><Text style={[styles.drawerText, pathname === item.href && styles.active]}>{t(item.key)}</Text>
              <ArrowRight size={18} color={colors.textMuted} />
            </Pressable></Link>)}
            <Link href={SPACE_APPS_EVENT.officialUrl} asChild><Pressable style={styles.register} accessibilityRole="link" onPress={() => setOpen(false)}>
              <Text style={styles.registerText}>{t('nav.registerLong')}</Text><ArrowRight size={18} color={colors.ink} />
            </Pressable></Link>
          </ScrollView>
        </View>
      </View>
    </Modal>
  </View>;
}

const styles = StyleSheet.create({
  shell: { backgroundColor: colors.background, borderBottomWidth: 1, borderBottomColor: colors.border,
    zIndex: 20, ...(Platform.OS === 'web' ? { position: 'sticky', top: 0 } as unknown as object : {}) },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, gap: 16 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 16, flexShrink: 1 },
  local: { borderLeftWidth: 1, borderLeftColor: colors.border, paddingLeft: 16 },
  localTitle: { fontFamily: fonts.bodyBold, color: colors.text, fontSize: 11, letterSpacing: 1.8 },
  localSubtitle: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 9, letterSpacing: 0.6, marginTop: 6 },
  links: { flexDirection: 'row', gap: 2, alignItems: 'center' },
  link: { paddingVertical: 14, paddingHorizontal: 7 },
  linkText: { color: colors.textMuted, fontFamily: fonts.bodyMedium, fontSize: 12 },
  active: { color: colors.primary },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  register: { backgroundColor: colors.primary, borderRadius: 4, paddingHorizontal: 18, paddingVertical: 14,
    minHeight: 46, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  registerText: { color: colors.ink, fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.6, flexShrink: 1 },
  menu: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 4 },
  backdrop: { flex: 1, backgroundColor: 'rgba(7,23,63,0.82)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  drawer: { backgroundColor: colors.background, width: '100%', maxWidth: 520, maxHeight: '100%', paddingTop: 32,
    borderLeftWidth: 1, borderLeftColor: colors.border },
  drawerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 20 },
  drawerContent: { padding: 24, gap: 16 },
  drawerLink: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
  linkIndex: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 11 },
  drawerText: { flex: 1, fontFamily: fonts.heading, fontSize: 23, color: colors.text },
});
