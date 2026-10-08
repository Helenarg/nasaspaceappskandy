import React from 'react';
import { View, StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import { Text } from './LocalizedText';
import Reveal from './Reveal';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';

/** Reveal complete lines, preserving Sinhala/Tamil graphemes and natural wrapping. */
export default function Headline({ title, style, highlightStyle, level = 1 }: {
  title: string; style: StyleProp<TextStyle>; highlightStyle?: StyleProp<TextStyle>; level?: number;
}) {
  const { lang } = useI18n();
  const translated = translateCopy(title, lang);
  const localized = translated === title ? title.split('\n').map(line => translateCopy(line, lang)).join('\n') : translated;
  const textStyle = StyleSheet.flatten(style) ?? {};
  const { marginBottom = 0, ...lineStyle } = textStyle;
  return <View style={{ marginBottom }} accessibilityRole="header" aria-level={level} accessibilityLabel={localized.replace(/\n/g, ' ')}>
    {localized.split('\n').map((line, index) => <View key={`${lang}-${index}`} style={{ overflow: 'hidden', paddingBottom: 4 }}>
      <Reveal masked delay={100 + index * 130} distance={64} duration={1050}>
        <Text aria-hidden accessible={false} style={[lineStyle, index > 0 && highlightStyle]}>{line}</Text>
      </Reveal>
    </View>)}
  </View>;
}
