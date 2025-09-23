import StyleDictionary from 'style-dictionary'
import { isTypographyFontOrLineHeight } from './utils'
import { TRANSFORM_NAME_PX_TYPOGRAPHY } from './transformNames'

export function registerTypographyPxOnlyTransform(sd: StyleDictionary): void {
  sd.registerTransform({
    name: TRANSFORM_NAME_PX_TYPOGRAPHY,
    type: 'value',
    transitive: true,
    filter: isTypographyFontOrLineHeight,
    transform: (token) => `${token.value}px`,
  })
}
