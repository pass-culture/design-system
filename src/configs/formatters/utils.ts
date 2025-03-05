import type { DesignToken } from 'style-dictionary/types'

export function designTokenFilter(token: DesignToken) {
  return token.attributes?.type !== 'primitive'
}
