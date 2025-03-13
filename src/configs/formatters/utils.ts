import { DesignToken } from 'style-dictionary/types'

export function designTokenFilter(token: DesignToken) {
  return !token.filePath.endsWith('primitive.json')
}
