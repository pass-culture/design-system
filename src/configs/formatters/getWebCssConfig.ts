import StyleDictionary, { Config } from 'style-dictionary'

export function getWebCssConfig(sd: typeof StyleDictionary, brand: string, theme: string): Config {
  return {
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/overrides/${brand}-${theme}.json`],
    include: ['src/tokens/global/**/*.json'],
    platforms: {
      css: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'time/seconds',
          'content/icon',
          'size/pxToRem',
          'color/css',
        ],
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: `variables-${theme}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  }
}
