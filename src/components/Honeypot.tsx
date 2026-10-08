import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type Props = { value: string; onChangeText: (v: string) => void };

/**
 * Bot trap. Positioned off-screen and hidden from assistive tech, so only a script
 * filling every input will populate it. Checked in useFormSubmit.
 */
export default function Honeypot({ value, onChangeText }: Props) {
  return (
    <View style={styles.hidden} aria-hidden accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoComplete="off"
        autoCorrect={false}
        // Named like a real field so naive bots take the bait.
        placeholder="Company website"
        tabIndex={-1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    pointerEvents: 'none',
    position: 'absolute',
    left: -9999,
    top: -9999,
    width: 1,
    height: 1,
    opacity: 0,
  },
});
