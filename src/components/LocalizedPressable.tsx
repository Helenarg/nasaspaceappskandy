import React, { forwardRef } from 'react';
import { Pressable as NativePressable, View, type PressableProps } from 'react-native';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';

/** Localize complete accessible labels, including controls without visible text. */
export const Pressable = forwardRef<View, PressableProps>(function LocalizedPressable({accessibilityLabel, accessibilityHint, ...props}, ref) {
  const {lang} = useI18n();
  return <NativePressable {...props} ref={ref}
    accessibilityLabel={accessibilityLabel ? translateCopy(accessibilityLabel, lang) : undefined}
    accessibilityHint={accessibilityHint ? translateCopy(accessibilityHint, lang) : undefined}/>;
});
