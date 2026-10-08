import React from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { colors } from '../theme/colors';
import GridBackground from './GridBackground';

export default function PageShell({ children, style, contentContainerStyle, ...props }: ScrollViewProps) {
  return <View style={styles.shell}><GridBackground />
    <ScrollView {...props} style={[styles.scroll, style]} contentContainerStyle={[styles.content, contentContainerStyle]}>
      {children}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: 'transparent' },
  content: { flexGrow: 1 },
});
