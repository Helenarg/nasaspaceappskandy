import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';
import React from 'react';
import Svg, { Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode, G, Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';
import { CITY_POINTS, MAP_VIEWBOX, SRI_LANKA_PATH } from '../theme/sriLankaGeo';

type Props = {
  width?: number;
  /** Provincial hub markers drawn at their real positions. */
  showNodes?: boolean;
};

const NODE_CITIES = [
  'Jaffna',
  'Trincomalee',
  'Anuradhapura',
  'Batticaloa',
  'Kurunegala',
  'Colombo',
  'Badulla',
  'Ratnapura',
  'Galle',
  'Matara',
] as const;

/**
 * One SVG for web and native (react-native-svg renders both), so Android no longer
 * falls back to a dashed oval.
 */
export default function SriLankaShape({ width = 280, showNodes = true }: Props) {
  const { lang } = useI18n();
  const height = (width / MAP_VIEWBOX.width) * MAP_VIEWBOX.height;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      accessibilityLabel={translateCopy('Map of Sri Lanka with the Kandy hub and provincial nodes', lang)}
    >
      <Defs>
        <Filter id="mapGlow" x="-30%" y="-30%" width="160%" height="160%">
          <FeGaussianBlur stdDeviation="4" result="blur" />
          <FeMerge>
            <FeMergeNode in="blur" />
            <FeMergeNode in="SourceGraphic" />
          </FeMerge>
        </Filter>
      </Defs>

      <G filter="url(#mapGlow)">
        {/* Faint fill so the landmass reads as a body, not just an outline. */}
        <Path d={SRI_LANKA_PATH} fill="rgba(0, 229, 255, 0.06)" stroke="none" />
        <Path
          d={SRI_LANKA_PATH}
          fill="none"
          stroke={colors.primary}
          strokeWidth={1.6}
          strokeLinejoin="round"
          strokeDasharray="7 6"
        />
      </G>

      {showNodes &&
        NODE_CITIES.map((city) => {
          const p = CITY_POINTS[city];
          return <Circle key={city} cx={p.x} cy={p.y} r={2.6} fill="rgba(0, 229, 255, 0.75)" />;
        })}

      {/* Kandy: the hub this site is run from. */}
      <Circle cx={CITY_POINTS.Kandy.x} cy={CITY_POINTS.Kandy.y} r={9} fill="rgba(255, 107, 53, 0.22)" />
      <Circle cx={CITY_POINTS.Kandy.x} cy={CITY_POINTS.Kandy.y} r={4.2} fill={colors.secondary} />
    </Svg>
  );
}
