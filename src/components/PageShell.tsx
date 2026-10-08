import React from 'react';
import { ScrollView, StyleSheet, View, Platform, type ScrollViewProps } from 'react-native';
import { colors } from '../theme/colors';
import GridBackground from './GridBackground';

// Web on-drag dismisses focus on any scroll, including browser input auto-scroll.
export default function PageShell({ children, style, contentContainerStyle, keyboardDismissMode, ...props }: ScrollViewProps) {
  return <View style={styles.shell}><GridBackground />
    <ScrollView testID="page-scroll" {...props} keyboardDismissMode={Platform.OS === 'web' ? 'none' : keyboardDismissMode} style={[styles.scroll, style]} contentContainerStyle={[styles.content, contentContainerStyle]}>
      {children}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: 'transparent' },
  content: { flexGrow: 1 },
});
