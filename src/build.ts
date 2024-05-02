import { formatHelpers, Formatter } from 'style-dictionary'

const sd = require('style-dictionary')
const StyleDictionaryJeune = sd.extend('src/configs/config-jeunes.json')
const StyleDictionaryPro = sd.extend('src/configs/config-pro.json')

const newVariable: Formatter = ({ dictionary, file }) => {
  const newVariable2 = JSON.stringify(formatHelpers.minifyDictionary(dictionary.tokens), null, 2)
  return `${formatHelpers.fileHeader({ file })}const theme = ${newVariable2} as const;\n`
}

StyleDictionaryJeune.registerFormat({
  name: 'typings/es6',
  formatter: newVariable,
})

StyleDictionaryPro.buildAllPlatforms()
StyleDictionaryJeune.buildAllPlatforms()
