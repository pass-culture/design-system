import StyleDictionary, { TransformedToken } from 'style-dictionary'
import { minifyDictionary, fileHeader } from 'style-dictionary/utils'
import { ConfigFormatter } from '../../types'
import { designTokenFilter } from './utils'

export const getWebTsConfig: ConfigFormatter = (sd, brand, theme) => {
  const destination = `index.${theme}.web.ts`
  const sizeTransform = 'size/pxToRem'

  return getTsConfig(sd, sizeTransform, destination, brand, theme)
}

export const getMobileTsConfig: ConfigFormatter = (sd, brand, theme) => {
  const destination = `index.${theme}.mobile.ts`
  const sizeTransform = 'size/px'

  return getTsConfig(sd, sizeTransform, destination, brand, theme)
}

function getTsConfig(
  sd: StyleDictionary,
  sizeTransform: string,
  destination: string,
  brand?: string,
  theme?: string
) {
  sd.registerFormat({
    name: 'typings/es6',
    format: async ({ dictionary, file }) => {
      const tokens = JSON.stringify(minifyDictionary(dictionary.tokens), null, 2)

      const colors = Object.entries(dictionary.tokens.color ?? {}).flatMap(([, value]) =>
        Object.values(value)
          .filter(
            (color): color is TransformedToken =>
              typeof color === 'object' && color !== null && 'value' in color
          )
          .map((color) => color.value)
      )

      const avoidDuplicateColors = Array.from(new Set(colors))

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
        transforms: ['attribute/cti', 'name/pascal', sizeTransform, 'color/hex'],
        buildPath: `build/${brand}/`,
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
