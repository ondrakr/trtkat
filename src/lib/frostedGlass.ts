import type { CSSProperties } from 'react';

export const frostedNavStyle: CSSProperties = {
  backgroundColor: 'rgba(2, 6, 23, 0.5)',
  WebkitBackdropFilter: 'blur(20px)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
};

export const frostedQuoteStyle: CSSProperties = {
  backgroundColor: 'rgba(15, 23, 42, 0.3)',
  WebkitBackdropFilter: 'blur(40px)',
  backdropFilter: 'blur(40px)',
  border: '1px solid rgba(255, 255, 255, 0.11)',
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.09)',
};
