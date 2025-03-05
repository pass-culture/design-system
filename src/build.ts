import { getBrandConfigs } from './configs/brands'
import { getTypoConfig } from './configs/formatters/getTypoConfig'
import StyleDictionary from 'style-dictionary'

//  Build the cross-brand configs
const sd = new StyleDictionary(getTypoConfig(StyleDictionary));
await sd.hasInitialized;
sd.buildAllPlatforms()

//  Build the brand-specific configs
const brandConfigs = getBrandConfigs(StyleDictionary)
for (const config of brandConfigs) {
  const StyleDictionaryBrand = new StyleDictionary(config);
  await StyleDictionaryBrand.hasInitialized;
  StyleDictionaryBrand.buildAllPlatforms()
}
