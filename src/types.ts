import StyleDictionary, { Config } from 'style-dictionary'

export enum Brand {
  PRO = 'pro',
  JEUNE = 'jeune',
}

export enum Platform {
  WEB_CSS = 'web.css',
  WEB_TS = 'web.ts',
  MOBILE_TS = 'mobile.ts',
  WEB_TYPO_REM_TS = 'web_typo_rem.ts',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type BrandsConfig = {
  [key in Brand]: {
    platforms: Platform[]
    themes: Theme[]
  }
}

export type ConfigFormatter = (sd: StyleDictionary, brand?: string, theme?: string) => Config

export type PlatformConfigs = {
  [key: string]: ConfigFormatter
}
