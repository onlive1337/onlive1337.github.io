import {
  Hct,
  SchemeExpressive,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

export const m3ColorKeys = [
  'primary',
  'primaryDim',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondary',
  'secondaryDim',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiary',
  'tertiaryDim',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
  'error',
  'errorDim',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'surfaceTint',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
] as const;

export type M3ColorKey = typeof m3ColorKeys[number];

const cssVarCache = new Map<string, Record<string, string>>();

function buildCssVars(seedColorHex: string, isDark: boolean): Record<string, string> {
  const sourceHct = Hct.fromInt(argbFromHex(seedColorHex));
  const scheme = new SchemeExpressive(sourceHct, isDark, 0.0, '2025', 'phone');
  const vars: Record<string, string> = {};

  for (const key of m3ColorKeys) {
    const colorValue = scheme[key];
    if (typeof colorValue === 'number') {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      vars[`--md-sys-color-${kebabKey}`] = hexFromArgb(colorValue);
    }
  }

  return vars;
}

export function applyM3Theme(seedColorHex: string, isDark: boolean) {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = `${seedColorHex}|${isDark ? 'dark' : 'light'}|2025-expressive`;
    let vars = cssVarCache.get(cacheKey);
    if (!vars) {
      vars = buildCssVars(seedColorHex, isDark);
      cssVarCache.set(cacheKey, vars);
    }

    const root = document.documentElement;
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }
  } catch (error) {
    console.error('Failed to apply M3 Theme:', error);
  }
}
