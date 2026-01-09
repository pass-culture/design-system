import StyleDictionary from 'style-dictionary'
import { DesignToken, TransformedToken, TransformedTokens } from 'style-dictionary/types'
import { fileHeader, minifyDictionary } from 'style-dictionary/utils'

export function designTokenFilter(token: DesignToken) {
  return !token.filePath.endsWith('primitive.json')
}

export function getTokensColors(tokens: TransformedTokens | TransformedToken): string[] {
  const isTokenWithValue = typeof tokens === 'object' && tokens !== null && 'value' in tokens

  if (!isTokenWithValue) {
    return Object.values(tokens).flatMap(getTokensColors)
  }

  return tokens.path.includes('color') ? tokens.value : []
}

export function ensureThemeEsModuleTypingsFormat(sd: StyleDictionary) {
  sd.registerFormat({
    name: 'typings/es6',
    format: async ({ dictionary, file }) => {
      const tokens = JSON.stringify(minifyDictionary(dictionary.tokens), null, 2)
      const avoidDuplicateColors = Array.from(new Set(getTokensColors(dictionary.tokens)))
      const colorsType = avoidDuplicateColors.map((c) => `"${c}"`).join(' | ')

      return `${await fileHeader({
        file,
        formatting: { fileHeaderTimestamp: true },
      })}export const theme = ${tokens} as const;\n\nexport type ColorsType = ${colorsType};\n`
    },
  })
}

type BrandTypingsConfig = {
  ensure: (sd: StyleDictionary) => void
  formatName: string
}

const defaultBrandTypings: BrandTypingsConfig = {
  ensure: ensureThemeEsModuleTypingsFormat,
  formatName: 'typings/es6',
}

const brandTypingsByBrand: Record<string, BrandTypingsConfig> = {
  jeune: {
    ensure: ensureThemeEsModuleTypingsMobileItalicFormat,
    formatName: 'typings/es6-mobile-italic',
  },
}

export function getBrandMobileTypings(brand?: string): BrandTypingsConfig {
  return brand ? brandTypingsByBrand[brand] ?? defaultBrandTypings : defaultBrandTypings
}

function mapItalicTypographyWeights(tokens: TransformedTokens) {
  const typography = tokens.typography
  if (!typography || typeof typography !== 'object' || 'value' in typography) return

  const italicWeights: Record<string, string> = {
    'Montserrat-MediumItalic': '500',
    'Montserrat-SemiBoldItalic': '600',
  }

  Object.values(typography).forEach((token) => {
    if (!token || typeof token !== 'object') return
    const fontFamily = token.fontFamily
    const fontWeight = fontFamily ? italicWeights[fontFamily] : undefined
    if (!fontWeight) return

    token.fontFamily = 'Montserrat'
    token.fontWeight = fontWeight
    token.fontStyle = 'italic'
  })
}

export function ensureThemeEsModuleTypingsMobileItalicFormat(sd: StyleDictionary) {
  sd.registerFormat({
    name: 'typings/es6-mobile-italic',
    format: async ({ dictionary, file }) => {
      const tokens: TransformedTokens = minifyDictionary(dictionary.tokens)
      const tokensClone: TransformedTokens = JSON.parse(JSON.stringify(tokens))

      mapItalicTypographyWeights(tokensClone)

      const tokensJson = JSON.stringify(tokensClone, null, 2)
      const avoidDuplicateColors = Array.from(new Set(getTokensColors(dictionary.tokens)))
      const colorsType = avoidDuplicateColors.map((c) => `"${c}"`).join(' | ')

      return `${await fileHeader({
        file,
        formatting: { fileHeaderTimestamp: true },
      })}export const theme = ${tokensJson} as const;\n\nexport type ColorsType = ${colorsType};\n`
    },
  })
}
