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

const cssVarCache = new Map<string, Record<string, string>>();
const themeCache = new Map<string, ReturnType<typeof themeFromSourceColor>>();

function buildCssVars(seedColorHex: string, isDark: boolean): Record<string, string> {
  let theme = themeCache.get(seedColorHex);
  if (!theme) {
    theme = themeFromSourceColor(argbFromHex(seedColorHex));
    themeCache.set(seedColorHex, theme);
  }
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  const vars: Record<string, string> = {};

  m3ColorKeys.forEach((key) => {
    const colorValue = scheme[key];
    if (typeof colorValue === 'number') {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      vars[`--md-sys-color-${kebabKey}`] = hexFromArgb(colorValue);
    }
  });

  const neutral = theme.palettes.neutral;
  const tones = isDark ? surfaceTones.dark : surfaceTones.light;
  (Object.entries(tones) as [string, number][]).forEach(([role, tone]) => {
    vars[`--md-sys-color-${role}`] = hexFromArgb(neutral.tone(tone));
  });

  vars['--md-sys-color-surface-tint'] = hexFromArgb(scheme.primary);
  return vars;
}

export function applyM3Theme(seedColorHex: string, isDark: boolean) {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = `${seedColorHex}|${isDark ? 'dark' : 'light'}`;
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
