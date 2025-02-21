import StyleDictionary, { formatHelpers } from 'style-dictionary'
import { ConfigFormatter } from '../../types'
import { isSemanticToken } from './utils'

export const getWebTsConfig: ConfigFormatter = async (sd, brand, theme) => {
  const destination = `index.${theme}.web.ts`
  const sizeTransform = 'size/pxToRem'

  return getTsConfig(sd, sizeTransform, destination, brand, theme)
}

export const getMobileTsConfig: ConfigFormatter = async (sd, brand, theme) => {
  const destination = `index.${theme}.mobile.ts`
  const sizeTransform = 'size/px'

  return getTsConfig(sd, sizeTransform, destination, brand, theme)
}

function getTsConfig(
  sd: StyleDictionary.Core,
  sizeTransform: string,
  destination: string,
  brand?: string,
  theme?: string
) {
  sd.registerFormat({
    name: 'typings/es6',
    formatter: ({ dictionary, file }) => {
      const tokens = JSON.stringify(formatHelpers.minifyDictionary(dictionary.tokens), null, 2)
      return `${formatHelpers.fileHeader({
        file,
      })}export const theme = ${tokens} as const;\n`
    },
  })

  return {
    include: ['src/tokens/global/**/*.json'],
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/cti/pascal', sizeTransform, 'color/hex'],
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: destination,
            format: 'typings/es6',
            filter: isSemanticToken,
          },
        ],
      },
    },
  }
}
