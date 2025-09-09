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
