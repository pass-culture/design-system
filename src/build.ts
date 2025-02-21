import { getBrandConfigs } from './configs/brands'
import { getTypoConfig } from './configs/formatters/getTypoConfig'
import sd from 'style-dictionary'

//  Build the cross-brand configs
;(async () => {
  /*   const StyleDictionaryGlobal = sd.extend(await getTypoConfig(sd))
  StyleDictionaryGlobal.buildAllPlatforms() */

  //  Build the brand-specific configs
  const brandConfigs = getBrandConfigs(sd)
  for (const config of brandConfigs) {
    const StyleDictionaryBrand = sd.extend(await config)
    StyleDictionaryBrand.buildAllPlatforms()
  }
})()
