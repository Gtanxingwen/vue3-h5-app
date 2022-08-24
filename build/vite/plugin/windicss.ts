import type { Plugin } from 'vite';

import WindiCSS from 'vite-plugin-windicss';

export function configWindiCssPlugin(): Plugin[] {
  return WindiCSS({
    safelist: 'no-select',
    preflight: {
      enableAll: true,
    },
  });
}
