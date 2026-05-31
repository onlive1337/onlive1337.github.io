import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

export const m3ColorKeys = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
] as const;

export type M3ColorKey = typeof m3ColorKeys[number];

const surfaceTones = {
  light: {
    'surface-dim': 87,
    'surface-bright': 98,
    'surface-container-lowest': 100,
    'surface-container-low': 96,
    'surface-container': 94,
    'surface-container-high': 92,
    'surface-container-highest': 90,
  },
  dark: {
    'surface-dim': 6,
    'surface-bright': 24,
    'surface-container-lowest': 4,
    'surface-container-low': 10,
    'surface-container': 12,
    'surface-container-high': 17,
    'surface-container-highest': 22,
  },
} as const;

export function applyM3Theme(seedColorHex: string, isDark: boolean) {
  if (typeof window === 'undefined') return;

  try {
    const seedColorArgb = argbFromHex(seedColorHex);
    const theme = themeFromSourceColor(seedColorArgb);
    const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

    const root = document.documentElement;

    m3ColorKeys.forEach((key) => {
      const colorValue = scheme[key];
      if (typeof colorValue === 'number') {
        const hex = hexFromArgb(colorValue);
        const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        root.style.setProperty(`--md-sys-color-${kebabKey}`, hex);
      }
    });

    const neutral = theme.palettes.neutral;
    const tones = isDark ? surfaceTones.dark : surfaceTones.light;
    (Object.entries(tones) as [string, number][]).forEach(([role, tone]) => {
      root.style.setProperty(`--md-sys-color-${role}`, hexFromArgb(neutral.tone(tone)));
    });

    root.style.setProperty('--md-sys-color-surface-tint', hexFromArgb(scheme.primary));
  } catch (error) {
    console.error('Failed to apply M3 Theme:', error);
  }
}
