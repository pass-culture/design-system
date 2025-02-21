import { formatHelpers, Formatter, TransformedToken, TransformedTokens } from 'style-dictionary'
import { ConfigFormatter } from '../../types'

function createFontFace(token: TransformedTokens | TransformedToken) {
  return [
    '@font-face {',
    ` font-family: "${token.family}";`,
    token.style ? ` font-style: "${token.style}";` : '',
    token.weight ? ` font-weight: "${token.weight}";` : '',
    ` src: url(${token.src}) format('woff2');`,
    ` font-display: "swap";`,
    ` unicode-range: "${token['unicode-range']}";`,
    '}',
  ]
    .filter(Boolean)
    .join('\n')
}

const sdFontFacesFormatter: Formatter = ({ dictionary, file }) => {
  const fontFacesTokens =
    (formatHelpers.minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  return `${formatHelpers.fileHeader({
    file,
  })}\n${Object.values(fontFacesTokens).map(createFontFace).join('\n\n')}`
}

const sdFontPreloadsFormatter: Formatter = ({ dictionary, file }) => {
  const fontTokens =
    (formatHelpers.minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  function createPreload(token: TransformedTokens | TransformedToken) {
    return `<link rel="preload" href="${token.src}" as="font" type="font/woff2" crossorigin/>`
  }

  return `${formatHelpers.fileHeader({
    file,
  })}\nexport const fontPreloads =\n\`${Object.values(fontTokens).map(createPreload).join('\n')}\``
}

export const getTypoConfig: ConfigFormatter = async (sd) => {
  sd.registerFormat({
    name: 'css/font-faces',
    formatter: sdFontFacesFormatter,
  })

  sd.registerFormat({
    name: 'ts/font-preloads',
    formatter: sdFontPreloadsFormatter,
  })

  return {
    source: ['src/tokens/global/typography/**/*.json'],
    platforms: {
      css: {
        transforms: ['name/cti/kebab'],
        buildPath: 'build/global/',
        files: [
          {
            destination: 'font-faces.css',
            format: 'css/font-faces',
          },
        ],
      },
      js: {
        transforms: ['name/cti/kebab'],
        buildPath: 'build/global/',
        files: [
          {
            destination: 'font-preloads.ts',
            format: 'ts/font-preloads',
          },
        ],
      },
    },
  }
}
