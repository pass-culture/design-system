import StyleDictionary, { Config } from 'style-dictionary'
import { BrandsConfig, Platform, PlatformConfigs, Theme } from '../types'
import { getWebCssConfig } from './formatters/getWebCssConfig'
import { getMobileTsConfig, getWebTsConfig } from './formatters/getTsConfig'

export const brandsConfig: BrandsConfig = {
  pro: {
    platforms: [Platform.WEB_CSS, Platform.WEB_TS],
    themes: [Theme.LIGHT, Theme.DARK],
  },
  jeune: {
    platforms: [Platform.WEB_TS, Platform.MOBILE_TS],
    themes: [Theme.LIGHT, Theme.DARK],
  },
}

export const platformFormatter: PlatformConfigs = {
  ['web.css']: getWebCssConfig,
  ['web.ts']: getWebTsConfig,
  ['mobile.ts']: getMobileTsConfig,
}

export function getBrandConfigs(sd: StyleDictionary): Config[] {
  return Object.entries(brandsConfig).flatMap(([brand, brandConfig]) => {
    return brandConfig.platforms.flatMap((platform) => {
      const configFn = platformFormatter[platform]
      if (!configFn) {
        throw Error(`No formatter defined for platform ${platform}`)
      }

      return brandConfig.themes.map((theme: string) => {
        return configFn(sd, brand, theme)
      })
    })
  })
}
