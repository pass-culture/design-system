import { ConfigFormatter } from '../../types'
import { registerCustomTransforms } from '../transformers/sizeTransform'

import { designTokenFilter, ensureThemeEsModuleTypingsFormat } from './utils'

export const getWebTypoRemTsConfig: ConfigFormatter = (sd, brand, theme) => {
  ensureThemeEsModuleTypingsFormat(sd)
  registerCustomTransforms(sd)

  const destination = `${theme}.web_typo_rem.ts`
  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/pascal', 'color/hex', 'size/pxToRem_typography'],
        buildPath: `lib/${brand}/`,
        files: [
          {
            destination,
            format: 'typings/es6',
            filter: designTokenFilter,
          },
        ],
      },
    },
  }
}
