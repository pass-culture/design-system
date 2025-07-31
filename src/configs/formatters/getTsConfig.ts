import StyleDictionary from 'style-dictionary'
import { minifyDictionary, fileHeader } from 'style-dictionary/utils'
import { ConfigFormatter } from '../../types'
import { designTokenFilter, getTokensColors } from './utils'

export const getWebTsConfig: ConfigFormatter = (sd, brand, theme) => {
  const destination = `${theme}.web.ts`
  const sizeTransform = 'size/pxToRem'

  return getTsConfig(sd, sizeTransform, destination, brand, theme)
}

export const getMobileTsConfig: ConfigFormatter = (sd, brand, theme) => {
  const destination = `${theme}.mobile.ts`
  const sizeTransform = 'size/px'

  return getTsConfig(sd, null, destination, brand, theme)
}

function getTsConfig(
  sd: StyleDictionary,
  sizeTransform: string | null,
  destination: string,
  brand?: string,
  theme?: string
) {
  sd.registerFormat({
    name: 'typings/es6',
    format: async ({ dictionary, file }) => {
      const tokens = JSON.stringify(minifyDictionary(dictionary.tokens), null, 2)

      const avoidDuplicateColors = Array.from(new Set(getTokensColors(dictionary.tokens)))

      const colorsType = avoidDuplicateColors.map((color) => `"${color}"`).join(' | ')

      return `${await fileHeader({
        file,
        formatting: {
          fileHeaderTimestamp: true,
        },
      })}export const theme = ${tokens} as const;\n\nexport type ColorsType = ${colorsType};
      `
    },
  })

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
