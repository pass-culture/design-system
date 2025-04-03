import StyleDictionary from 'style-dictionary'
import { getBrandConfigs } from './configs/brands'
import { getTypoConfig } from './configs/formatters/getTypoConfig'
import { getAssetConfig } from './configs/formatters/getAssetConfig'

const sd = new StyleDictionary()

//  Build the typo configs
const StyleDictionaryTypo = await sd.extend(getTypoConfig(sd))
StyleDictionaryTypo.buildAllPlatforms()

//  Build the assets configs
const StyleDictionaryAsset = await sd.extend(getAssetConfig(sd))
StyleDictionaryAsset.buildAllPlatforms()

//  Build the brand-specific configs
const brandConfigs = getBrandConfigs(sd)
for (const config of brandConfigs) {
  const StyleDictionaryBrand = await sd.extend(config)
  StyleDictionaryBrand.buildAllPlatforms()
}
