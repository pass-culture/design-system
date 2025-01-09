import StyleDictionary, { Config } from 'style-dictionary'

export type BrandsConfig = {
  [key: string]: {
    platforms: string[]
    themes: string[]
  }
}

export type FormatterConfig = {
  [key: string]: (sd: typeof StyleDictionary, brand: string, theme: string) => Config
}
