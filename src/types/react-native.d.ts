import 'react-native';

// RN 0.86 implements the CSS-style `textShadow` shorthand (and warns that the old
// textShadow* props are deprecated) but its types do not declare it yet.
declare module 'react-native' {
  interface TextStyle {
    textShadow?: string;
  }
}
