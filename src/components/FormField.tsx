import React, { forwardRef, useId, useRef, useEffect, useImperativeHandle } from 'react';
import { Platform, View, TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { Text, localeTextStyle } from './LocalizedText';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = TextInputProps & {
  label: string;
  error?: string;
  required?: boolean;
  /** Short hint under the label, e.g. "We only use this to send your team pack." */
  hint?: string;
};

const FormField = forwardRef<TextInput, Props>(function FormField(
  { label, error, required, hint, style, multiline, placeholder, ...inputProps },
  ref
) {
  const { lang } = useI18n();
  const input = useRef<TextInput>(null);
  useImperativeHandle(ref, () => input.current!);
  useEffect(() => {
    if (!error || Platform.OS !== 'web') return;
    const node = input.current as unknown as HTMLElement | null;
    const firstInvalid = node?.closest('[role="main"]')?.querySelector('[aria-invalid="true"]');
    if (node && node === firstInvalid) node.focus();
  }, [error]);
  const id = useId().replace(/:/g, '');
  const hintId = `field-${id}-hint`;
  const errorId = `field-${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  return (
    <View style={styles.group}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.requiredMark}> *</Text> : null}
      </Text>
      {hint ? <Text nativeID={hintId} style={styles.hint}>{hint}</Text> : null}

      <TextInput
        ref={input}
        style={[styles.input, multiline && styles.textArea, !!error && styles.inputError, style, localeTextStyle(styles.input, lang)]}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        placeholder={placeholder ? translateCopy(placeholder, lang) : undefined}
        accessibilityLabel={translateCopy(label, lang)}
        // Announced by screen readers alongside the field, not just shown in red.
        accessibilityHint={error || hint ? translateCopy(error || hint || '', lang) : undefined}
        aria-invalid={!!error}
        {...(Platform.OS === 'web' ? { 'aria-required': !!required, 'aria-describedby': describedBy } : {})}
        {...inputProps}
      />

      {error ? (
        <Text nativeID={errorId} style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
});

export default FormField;

const styles = StyleSheet.create({
  group: {
    marginBottom: 24,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.bodyBold,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  requiredMark: {
    color: colors.error,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.body,
    marginBottom: 8,
    marginTop: -4,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts.body,
    minHeight: 56,
  },
  textArea: {
    minHeight: 144,
    paddingTop: 13,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: 'rgba(255, 107, 53, 0.06)',
  },
  error: {
    color: colors.error,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.bodyMedium,
    marginTop: 6,
  },
});
