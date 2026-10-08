import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg';

/** Static, subtle grid shared by web and native. It never intercepts input. */
export default function GridBackground() {
  return <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]} accessibilityElementsHidden aria-hidden>
    <Svg width="100%" height="100%"><Defs>
      <Pattern id="spaceAppsGrid" width="96" height="96" patternUnits="userSpaceOnUse">
        <Path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
      </Pattern>
    </Defs><Rect width="100%" height="100%" fill="url(#spaceAppsGrid)" /></Svg>
  </View>;
}
