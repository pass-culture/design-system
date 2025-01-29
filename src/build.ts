import { getBrandConfigs } from './configs/brands'
import { getTypoConfig } from './configs/formatters/getTypoConfig'
import sd from 'style-dictionary'

//  Build the cross-brand configs
const StyleDictionaryGlobal = sd.extend(getTypoConfig(sd))
StyleDictionaryGlobal.buildAllPlatforms()

//  Build the brand-specific configs
const brandConfigs = getBrandConfigs(sd)
for (const config of brandConfigs) {
  const StyleDictionaryBrand = sd.extend(config)
  StyleDictionaryBrand.buildAllPlatforms()
}
