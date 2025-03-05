import { TransformedToken, TransformedTokens } from 'style-dictionary'
import { ConfigFormatter } from '../../types'
import { fileHeader, minifyDictionary } from 'style-dictionary/utils';
import type { FormatFn } from 'style-dictionary/types';


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

const sdFontFacesFormatter: FormatFn = ({ dictionary, file }) => {
  const fontFacesTokens =
    (minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  return `${fileHeader({
    file,
  })}\n${Object.values(fontFacesTokens).map(createFontFace).join('\n\n')}`
}

const sdFontPreloadsFormatter: FormatFn = ({ dictionary, file }) => {
  const fontTokens =
    (minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  function createPreload(token: TransformedTokens | TransformedToken) {
    return `<link rel="preload" href="${token.src}" as="font" type="font/woff2" crossorigin/>`
  }

  return `${fileHeader({
    file,
  })}\nexport const fontPreloads =\n\`${Object.values(fontTokens).map(createPreload).join('\n')}\``
}

export const getTypoConfig: ConfigFormatter = (sd) => {
  sd.registerFormat({
    name: 'css/font-faces',
    format: sdFontFacesFormatter,
  })

  sd.registerFormat({
    name: 'ts/font-preloads',
    format: sdFontPreloadsFormatter,
  })

  return {
    source: ['src/tokens/global/typography/**/*.json'],
    platforms: {
      css: {
        transforms: ['name/kebab'],
        buildPath: 'build/global/',
        files: [
          {
            destination: 'font-faces.css',
            format: 'css/font-faces',
          },
        ],
      },
      js: {
        transforms: ['name/kebab'],
        buildPath: 'build/global/',
        files: [
          {
            destination: 'font-preloads.ts',
            format: 'ts/font-preloads',
          },
        ],
      },
    },
  };
}
