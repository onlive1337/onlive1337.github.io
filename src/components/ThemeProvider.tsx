"use client"
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { applyM3Theme } from '@/utils/m3-theme'

export const DEFAULT_SEED_COLOR = '#8E4EC6';

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: string;
  enableSystem?: boolean;
}

function M3ThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark = resolvedTheme === 'dark';
    applyM3Theme(DEFAULT_SEED_COLOR, isDark);
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <M3ThemeSync />
      {children}
    </NextThemesProvider>
  )
}