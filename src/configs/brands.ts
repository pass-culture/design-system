import StyleDictionary from 'style-dictionary'
import { BrandsConfig, FormatterConfig } from '../types'
import { getWebCssConfig } from './formatters/getWebCssConfig'
import { getMobileTsConfig, getWebTsConfig } from './formatters/getTsConfig'

export const brandsConfig: BrandsConfig = {
  pro: {
    platforms: ['web.css', 'web.ts'],
    themes: ['light', 'dark'],
  },
  jeune: {
    platforms: ['web.ts', 'mobile.ts'],
    themes: ['light', 'dark'],
  },
}

export const platformFormatter: FormatterConfig = {
  ['web.css']: getWebCssConfig,
  ['web.ts']: getWebTsConfig,
  ['mobile.ts']: getMobileTsConfig,
}

export function getBrandConfigs(sd: typeof StyleDictionary) {
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
