import { DesignToken } from 'style-dictionary/types/DesignToken'

export function designTokenFilter(token: DesignToken) {
  return token.attributes?.type !== 'primitive'
}
