import StyleDictionary from 'style-dictionary'
import { getBrandConfigs } from './configs/brands'
import { getTypoConfig } from './configs/formatters/getTypoConfig'

const sd = new StyleDictionary()

//  Build the cross-brand configs
const StyleDictionaryGlobal = await sd.extend(getTypoConfig(sd))
StyleDictionaryGlobal.buildAllPlatforms()

//  Build the brand-specific configs
const brandConfigs = getBrandConfigs(sd)
for (const config of brandConfigs) {
  const StyleDictionaryBrand = await sd.extend(config)
  StyleDictionaryBrand.buildAllPlatforms()
}
