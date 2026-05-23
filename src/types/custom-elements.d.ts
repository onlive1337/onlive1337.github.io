import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-ripple': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        for?: string;
        unbounded?: boolean;
        disabled?: boolean;
      }, HTMLElement>;
    }
  }
}
export {};
