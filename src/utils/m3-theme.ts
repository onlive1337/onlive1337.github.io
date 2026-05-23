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

/**
 * Generates an M3 scheme from a seed hex color and updates CSS variables on the document element.
 */
export function applyM3Theme(seedColorHex: string, isDark: boolean) {
  if (typeof window === 'undefined') return;

  try {
    const seedColorArgb = argbFromHex(seedColorHex);
    const theme = themeFromSourceColor(seedColorArgb);
    const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

    const root = document.documentElement;

    m3ColorKeys.forEach((key) => {
      // Get ARGB color integer
      const colorValue = scheme[key];
      if (typeof colorValue === 'number') {
        const hex = hexFromArgb(colorValue);
        // Inject as CSS Custom Property
        // Transform camelCase keys to kebab-case
        const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        root.style.setProperty(`--md-sys-color-${kebabKey}`, hex);
      }
    });
  } catch (error) {
    console.error('Failed to apply M3 Theme:', error);
  }
}
