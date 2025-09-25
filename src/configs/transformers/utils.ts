import { DesignToken } from 'style-dictionary/types'

export function isTypographyFontOrLineHeight(token: DesignToken): boolean {
  if (token.attributes?.category !== 'typography') return false
  const type = token.attributes?.type
  const path = Array.isArray(token.path) ? token.path : []
  return (
    type === 'fontSize' ||
    type === 'lineHeight' ||
    path.includes('fontSize') ||
    path.includes('lineHeight')
  )
}
