import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { LANGUAGES, useI18n } from '../i18n';

/** EN / සිං / தமி switch. Sri Lanka has two official languages; English is the third. */
export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();

  return (
    <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel="Language">
      {LANGUAGES.map((l) => {
        const active = l.code === lang;
        return (
          <Pressable
            key={l.code}
            onPress={() => setLang(l.code)}
            style={[styles.item, compact && styles.itemCompact, active && styles.itemActive]}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={l.name}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{l.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 2,
    gap: 2,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCompact: {
    paddingHorizontal: 8,
    minWidth: 36,
  },
  itemActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.16)',
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.bodyBold,
  },
  labelActive: {
    color: colors.primary,
  },
});
