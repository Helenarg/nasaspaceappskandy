import React, { forwardRef } from 'react';
import { Text as NativeText, StyleSheet, Platform, type TextProps, type TextStyle } from 'react-native';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';
import { useViewport } from '../theme/useViewport';

export function localeTextStyle(style: TextStyle, lang: 'en' | 'si' | 'ta', width = Infinity): TextStyle {
  if (lang === 'en') return {};
  const result: TextStyle = { letterSpacing: 0 };
  if (style.fontFamily || style.fontWeight) {
    const bold = /Bold|Black/.test(style.fontFamily ?? '') || Number(style.fontWeight) >= 600;
    result.fontFamily = lang === 'si' ? (bold ? 'NotoSansSinhala_700Bold' : 'NotoSansSinhala_400Regular')
      : (bold ? 'NotoSansTamil_700Bold' : 'NotoSansTamil_400Regular');
    result.fontWeight = 'normal';
  }
  if (style.fontSize) {
    result.fontSize = style.fontSize >= 36 ? Math.round(style.fontSize * (width < 380 ? 0.63 : width < 600 ? 0.72 : 0.82)) : style.fontSize;
    result.lineHeight = Math.max(style.lineHeight ?? 0, Math.ceil(result.fontSize * 1.55));
  }
  return result;
}

/** One text primitive supplies script-aware fonts, shaping room and presentation copy. */
export const Text = forwardRef<NativeText, TextProps>(function LocalizedText({ children, style, accessibilityLabel, ...props }, ref) {
  const { lang } = useI18n();
  const { width } = useViewport();
  const pieces = React.Children.toArray(children);
  const plain = pieces.every(piece => typeof piece === 'string' || typeof piece === 'number');
  const joined = plain ? pieces.join('') : '';
  const translated = plain ? translateCopy(joined, lang) : '';
  const content = plain && translated !== joined ? translated : pieces.map(piece => typeof piece === 'string' ? translateCopy(piece, lang) : piece);
  const visibleText = typeof content === 'string' ? content : content.filter(piece => typeof piece === 'string').join('');
  const script = /[\u0B80-\u0BFF]/.test(visibleText) ? 'ta' : /[\u0D80-\u0DFF]/.test(visibleText) ? 'si' : visibleText.trim() ? 'en' : lang;
  // Intentional untranslated editorial text must retain English pronunciation.
  return <NativeText {...props} {...(Platform.OS === 'web' ? {lang: script} : {accessibilityLanguage: script})} ref={ref} accessibilityLabel={accessibilityLabel ? translateCopy(accessibilityLabel, lang) : undefined}
    style={[style, localeTextStyle(StyleSheet.flatten(style) ?? {}, script, width)]}>{content}</NativeText>;
});
