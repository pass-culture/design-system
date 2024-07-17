import { formatHelpers, Formatter, TransformedToken, TransformedTokens } from 'style-dictionary'

const sd = require('style-dictionary')
const StyleDictionaryJeuneNative = sd.extend('src/configs/config-jeunes.json')
const StyleDictionaryJeuneWeb = sd.extend('src/configs/config-jeunes-web.json')
const StyleDictionaryPro = sd.extend('src/configs/config-pro.json')

const sdJeuneFormatter: Formatter = ({ dictionary, file }) => {
  const tokens = JSON.stringify(formatHelpers.minifyDictionary(dictionary.tokens), null, 2)
  return `${formatHelpers.fileHeader({ file })}export const theme = ${tokens} as const;\n`
}

const sdFontFacesFormatter: Formatter = ({ dictionary, file }) => {
  const fontFacesTokens =
    (formatHelpers.minifyDictionary(dictionary.tokens) as typeof dictionary.tokens)['font'] ?? {}

  function createFontFace(token: TransformedTokens | TransformedToken) {
    return [
      '@font-face {',
      ` font-family: "${token.family}";`,
      token.style ? ` font-style: "${token.style}";` : '',
      token.weight ? ` font-weight: "${token.weight}";` : '',
      ` src: ${token.src};`,
      ` font-display: "swap";`,
      ` unicode-range: "${token['unicode-range']}";`,
      '}',
    ]
      .filter(Boolean)
      .join('\n')
  }

  return Object.values(fontFacesTokens).map(createFontFace).join('\n\n')
}

StyleDictionaryJeuneNative.registerFormat({
  name: 'typings/es6',
  formatter: sdJeuneFormatter,
})

StyleDictionaryJeuneWeb.registerFormat({
  name: 'typings/es6',
  formatter: sdJeuneFormatter,
})

StyleDictionaryPro.registerFormat({
  name: 'css/font-faces',
  formatter: sdFontFacesFormatter,
})

StyleDictionaryJeuneNative.buildAllPlatforms()
StyleDictionaryJeuneWeb.buildAllPlatforms()
StyleDictionaryPro.buildAllPlatforms()
