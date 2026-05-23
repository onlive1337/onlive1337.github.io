"use client";
import { useEffect } from 'react';

/**
 * Official Google Material Web `<md-ripple>` wrapper.
 * Lazily imports the web component definition on the client side only.
 */
export function Ripple({ disabled = false }: { disabled?: boolean }) {
  useEffect(() => {
    // Dynamically register the custom element once on the client
    import('@material/web/ripple/ripple.js');
  }, []);

  // @ts-expect-error — md-ripple is a custom element typed in custom-elements.d.ts
  return <md-ripple aria-hidden="true" {...(disabled ? { disabled: true } : {})} />;
}
