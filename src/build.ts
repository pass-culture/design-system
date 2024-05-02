import { formatHelpers, Formatter } from 'style-dictionary'

const sd = require('style-dictionary')
const StyleDictionaryJeune = sd.extend('src/configs/config-jeunes.json')
const StyleDictionaryPro = sd.extend('src/configs/config-pro.json')

const sdJeuneFormatter: Formatter = ({ dictionary, file }) => {
  const tokens = JSON.stringify(formatHelpers.minifyDictionary(dictionary.tokens), null, 2)
  return `${formatHelpers.fileHeader({ file })}export const theme = ${tokens} as const;\n`
}

StyleDictionaryJeune.registerFormat({
  name: 'typings/es6',
  formatter: sdJeuneFormatter,
})

StyleDictionaryPro.buildAllPlatforms()
StyleDictionaryJeune.buildAllPlatforms()
