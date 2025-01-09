import StyleDictionary, { Config, formatHelpers } from 'style-dictionary'

export function getWebTsConfig(sd: typeof StyleDictionary, brand: string, theme: string): Config {
  const destination = `index.${theme}.web.ts`
  const sizeTransform = 'size/pxToRem'

  return getTsConfig(sd, theme, brand, sizeTransform, destination)
}

export function getMobileTsConfig(
  sd: typeof StyleDictionary,
  brand: string,
  theme: string
): Config {
  const destination = `index.${theme}.mobile.ts`
  const sizeTransform = 'size/px'

  return getTsConfig(sd, theme, brand, sizeTransform, destination)
}

function getTsConfig(
  sd: StyleDictionary.Core,
  theme: string,
  brand: string,
  sizeTransform: string,
  destination: string
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
    source: [`src/tokens/themes/${theme}.json`, `src/tokens/overrides/${brand}-${theme}.json`],
    include: ['src/tokens/global/**/*.json'],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/cti/pascal', sizeTransform, 'color/hex'],
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: destination,
            format: 'typings/es6',
          },
        ],
      },
    },
  }
}
