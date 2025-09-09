import { ConfigFormatter } from '../../types'
import { designTokenFilter, ensureThemeEsModuleTypingsFormat } from './utils'

export const getWebTsConfig: ConfigFormatter = (sd, brand, theme) => {
  ensureThemeEsModuleTypingsFormat(sd)
  const destination = `${theme}.web.ts`
  const sizeTransform = 'size/pxToRem'

  return getTsConfig(sizeTransform, destination, brand, theme)
}

export const getMobileTsConfig: ConfigFormatter = (sd, brand, theme) => {
  ensureThemeEsModuleTypingsFormat(sd)
  const destination = `${theme}.mobile.ts`

  return getTsConfig(null, destination, brand, theme)
}

function getTsConfig(
  sizeTransform: string | null,
  destination: string,
  brand?: string,
  theme?: string
) {
  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/pascal', 'color/hex'].concat(sizeTransform || []),
        buildPath: `lib/${brand}/`,
        files: [
          {
            destination: destination,
            format: 'typings/es6',
            filter: designTokenFilter,
          },
        ],
      },
    },
  }
}
