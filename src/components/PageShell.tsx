import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Platform, type ScrollViewProps } from 'react-native';
import { colors } from '../theme/colors';
import GridBackground from './GridBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import { Text } from './LocalizedText';
import { useI18n } from '../i18n';

// Web on-drag dismisses focus on any scroll, including browser input auto-scroll.
export default function PageShell({ children, style, contentContainerStyle, keyboardDismissMode, ...props }: ScrollViewProps) {
  const main = useRef<View>(null);
  const [skipFocused, setSkipFocused] = useState(false);
  const { lang } = useI18n();
  const nodes = React.Children.toArray(children);
  const navbarIndex = nodes.findIndex(child => React.isValidElement(child) && child.type === Navbar);
  const footerIndex = nodes.findIndex(child => React.isValidElement(child) && child.type === Footer);
  const start = navbarIndex + 1;
  const end = footerIndex < 0 ? nodes.length : footerIndex;
  const skipLabel = lang === 'si' ? 'ප්‍රධාන අන්තර්ගතයට යන්න' : lang === 'ta' ? 'முதன்மை உள்ளடக்கத்திற்குச் செல்லவும்' : 'Skip to main content';
  const skip = () => {
    const element = main.current as unknown as HTMLElement | null;
    element?.focus?.({ preventScroll: true });
    element?.scrollIntoView?.({ block: 'start', behavior: 'auto' });
  };
  return <View style={styles.shell}><GridBackground />
    {Platform.OS === 'web' && <Pressable accessibilityRole="button" onPress={skip} onFocus={() => setSkipFocused(true)} onBlur={() => setSkipFocused(false)}
      style={[styles.skip, !skipFocused && styles.skipHidden]}><Text style={styles.skipText}>{skipLabel}</Text></Pressable>}
    <ScrollView testID="page-scroll" {...props} keyboardDismissMode={Platform.OS === 'web' ? 'none' : keyboardDismissMode} style={[styles.scroll, style]} contentContainerStyle={[styles.content, contentContainerStyle]}>
      {Platform.OS === 'web' ? <>{nodes.slice(0, start)}<View ref={main} role="main" nativeID="main-content" tabIndex={-1}>{nodes.slice(start, end)}</View>{nodes.slice(end)}</> : children}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: 'transparent' },
  content: { flexGrow: 1 },
  skip: { position: 'absolute', top: 8, left: 8, zIndex: 100, minHeight: 44, padding: 14, backgroundColor: colors.primary, borderRadius: 4 },
  skipHidden: { top: -200 },
  skipText: { color: colors.ink, fontSize: 16, fontWeight: '700' },
});
