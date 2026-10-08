import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View, Pressable } from 'react-native';
import { Text } from './LocalizedText';
import { fonts } from '../theme/typography';
import { colors } from '../theme/colors';
import { useViewport } from '../theme/useViewport';
import { useReducedMotion, USE_NATIVE_DRIVER } from '../theme/motion';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';
import { useMotionVisibility } from '../theme/useMotionVisibility';

export default function MissionTicker() {
  const [offset] = useState(() => new Animated.Value(0));
  const [groupWidth, setGroupWidth] = useState(0);
  const { width } = useViewport();
  const [paused, setPaused] = useState(false);
  const { ref, visible } = useMotionVisibility();
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  useEffect(() => {
    offset.setValue(0);
    if (reduced || !groupWidth || paused || !visible) return;
    const loop = Animated.loop(Animated.timing(offset, { toValue: -groupWidth, duration: 30000, easing: Easing.linear, useNativeDriver: USE_NATIVE_DRIVER }));
    loop.start(); return () => loop.stop();
  }, [offset, groupWidth, reduced, lang, paused, visible]);
  return <View ref={ref} accessibilityLabel={['EXPLORE', 'COLLABORATE', 'CREATE'].map(s => translateCopy(s, lang)).join('. ')} style={styles.shell}>
    <Animated.View aria-hidden accessibilityElementsHidden style={[styles.track, { transform: [{ translateX: offset }] }]}>
      {Array.from({ length: reduced ? 1 : 4 }, (_, index) => <View key={index} onLayout={index === 0 ? event => setGroupWidth(event.nativeEvent.layout.width) : undefined}
        style={[styles.group, { minWidth: width || 320 }, reduced && { maxWidth: width || 320, flexDirection: 'column', alignItems: 'flex-start' }]}>
        {['EXPLORE', 'COLLABORATE', 'CREATE'].map(word => <View key={word} style={styles.word}><Text style={styles.text}>{word}</Text><Text style={styles.star}>✦</Text></View>)}
      </View>)}
    </Animated.View>
    {!reduced && <Pressable accessibilityRole="button" accessibilityLabel={translateCopy(paused ? 'Resume moving text' : 'Pause moving text', lang)} onPress={() => setPaused(value => !value)} style={styles.pause}><Text style={styles.pauseText}>{paused ? '▶' : 'Ⅱ'}</Text></Pressable>}
  </View>;
}
const styles = StyleSheet.create({
  shell: { overflow: 'hidden', backgroundColor: colors.background, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, paddingVertical: 28, paddingRight: 52 },
  pause: { position: 'absolute', right: 8, top: 8, width: 44, height: 44, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  pauseText: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.primary },
  track: { flexDirection: 'row', alignItems: 'center' },
  group: { flexDirection: 'row', flexShrink: 0, alignItems: 'center', justifyContent: 'space-around', gap: 40, paddingHorizontal: 24 },
  word: { flexDirection: 'row', alignItems: 'center', gap: 40, maxWidth: '100%' },
  text: { fontFamily: fonts.heading, fontSize: 28, color: colors.text, letterSpacing: 1.5, flexShrink: 1 },
  star: { fontFamily: fonts.body, fontSize: 24, color: colors.primary },
});
