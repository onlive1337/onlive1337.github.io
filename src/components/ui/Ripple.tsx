"use client";
import { useEffect, type CSSProperties } from 'react';

export function Ripple({
  disabled = false,
  color,
}: {
  disabled?: boolean;
  color?: string;
}) {
  useEffect(() => {
    import('@material/web/ripple/ripple.js');
  }, []);

  const style = color
    ? ({
        '--md-ripple-hover-color': color,
        '--md-ripple-pressed-color': color,
      } as CSSProperties)
    : undefined;

  // @ts-expect-error — md-ripple is a custom element typed in custom-elements.d.ts
  return <md-ripple aria-hidden="true" style={style} {...(disabled ? { disabled: true } : {})} />;
}
