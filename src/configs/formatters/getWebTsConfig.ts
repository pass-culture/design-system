import { ConfigFormatter } from '../../types'
import { designTokenFilter, ensureThemeEsModuleTypingsFormat } from './utils'

export const getWebTsConfig: ConfigFormatter = (sd, brand, theme) => {
  ensureThemeEsModuleTypingsFormat(sd)

  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/pascal', 'color/hex', 'size/pxToRem'],
        buildPath: `lib/${brand}/`,
        files: [
          {
            destination: `${theme}.web.ts`,
            format: 'typings/es6',
            filter: designTokenFilter,
          },
        ],
      },
    },
  }
}
