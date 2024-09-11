import { formatHelpers, Formatter, TransformedToken, TransformedTokens } from 'style-dictionary'
import { getNativeConfig } from './configs/getNativeConfig'

const sd = require('style-dictionary')
const StyleDictionaryPro = sd.extend('src/configs/config-pro.json')
const StyleDictionaryFonts = sd.extend('src/configs/config-fonts.json')

const sdFontFacesFormatter: Formatter = ({ dictionary }) => {
  const fontFacesTokens =
    (formatHelpers.minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

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

  return Object.values(fontFacesTokens).map(createFontFace).join('\n\n')
}

const sdFontPreloadsFormatter: Formatter = ({ dictionary }) => {
  const fontTokens =
    (formatHelpers.minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  function createPreload(token: TransformedTokens | TransformedToken) {
    return `<link rel="preload" href="${token.src}" as="font" type="font/woff2" crossorigin/>`
  }

  return `export const fontPreloads =\n\`${Object.values(fontTokens)
    .map(createPreload)
    .join('\n')}\``
}

StyleDictionaryFonts.registerFormat({
  name: 'css/font-faces',
  formatter: sdFontFacesFormatter,
})

StyleDictionaryFonts.registerFormat({
  name: 'ts/font-preloads',
  formatter: sdFontPreloadsFormatter,
})

//  Generate native variables for all platforms
const sdNativeFormatter: Formatter = ({ dictionary, file }) => {
  const tokens = JSON.stringify(formatHelpers.minifyDictionary(dictionary.tokens), null, 2)
  return `${formatHelpers.fileHeader({ file })}export const theme = ${tokens} as const;\n`
}
;(['web', 'mobile'] as const).map((platform) => {
  const StyleDictionaryNative = sd.extend(getNativeConfig(platform))

  StyleDictionaryNative.registerFormat({
    name: 'typings/es6',
    formatter: sdNativeFormatter,
  })

  StyleDictionaryNative.buildAllPlatforms()
})

StyleDictionaryPro.buildAllPlatforms()
StyleDictionaryFonts.buildAllPlatforms()
