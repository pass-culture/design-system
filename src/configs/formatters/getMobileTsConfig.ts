import { ConfigFormatter } from '../../types'
import { registerTypographyPxOnlyTransform } from '../transformers/sizeTypographyPxOnly'

import { designTokenFilter, ensureThemeEsModuleTypingsFormat } from './utils'

export const getMobileTsConfig: ConfigFormatter = (sd, brand, theme) => {
  ensureThemeEsModuleTypingsFormat(sd)
  registerTypographyPxOnlyTransform(sd)

  const destination = `${theme}.mobile.ts`
  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/pascal', 'color/hex', 'size/px_typographyOnly'],
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
