import { ConfigFormatter } from '../../types'
import { designTokenFilter } from './utils'

export const getWebCssConfig: ConfigFormatter = (_sd, brand, theme) => {
  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      css: {
        transforms: [
          'attribute/cti',
          'name/kebab',
          'time/seconds',
          'html/icon',
          'size/pxToRem',
          'color/css',
        ],
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: `variables-${theme}.css`,
            format: 'css/variables',
            filter: designTokenFilter,
            options: {
              selector: `[data-theme="${theme}"]`,
            },
          },
        ],
      },
    },
  };
}
