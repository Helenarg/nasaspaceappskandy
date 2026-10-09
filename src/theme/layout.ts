import type { ViewStyle } from 'react-native';

export const layout = {
  maxWidth: 1280,
  gutter: (width: number) => width < 600 ? 24 : width < 1100 ? 40 : 64,
  sectionSpace: (width: number) => width < 600 ? 56 : 88,
  cardPadding: (width: number) => width < 600 ? 24 : 32,
  gap: (width: number) => width < 600 ? 24 : 32,
  container(width: number): ViewStyle {
    return { width: '100%', maxWidth: 1280, alignSelf: 'center', paddingHorizontal: this.gutter(width) };
  },
  section(width: number): ViewStyle {
    return { ...this.container(width), paddingVertical: this.sectionSpace(width) };
  },
  // PageHeader owns the first gap; avoid stacking a second full section top gap.
  contentSection(width: number): ViewStyle {
    return { ...this.container(width), paddingBottom: this.sectionSpace(width) };
  },
};
