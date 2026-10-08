import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, type TextInputProps } from 'react-native';
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
  { label, error, required, hint, style, multiline, ...inputProps },
  ref
) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.requiredMark}> *</Text> : null}
      </Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}

      <TextInput
        ref={ref}
        style={[styles.input, multiline && styles.textArea, !!error && styles.inputError, style]}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        accessibilityLabel={label}
        // Announced by screen readers alongside the field, not just shown in red.
        accessibilityHint={error || hint}
        aria-invalid={!!error}
        {...inputProps}
      />

      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
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
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: fonts.body,
    marginBottom: 8,
    marginTop: -4,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
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
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    marginTop: 6,
  },
});
