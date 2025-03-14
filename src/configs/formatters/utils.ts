import { DesignToken, TransformedToken, TransformedTokens } from 'style-dictionary/types'

export function designTokenFilter(token: DesignToken) {
  return !token.filePath.endsWith('primitive.json')
}

export function getColorsCodesInTokens(tokens: TransformedTokens | TransformedToken): string[] {
  if (tokens.attributes?.category === 'color') {
    return tokens.value
  }
  return Object.entries(tokens).flatMap(([_, token]) => getColorsCodesInTokens(token))
}
