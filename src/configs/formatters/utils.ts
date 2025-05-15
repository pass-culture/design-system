import { DesignToken, TransformedToken, TransformedTokens } from 'style-dictionary/types'

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
