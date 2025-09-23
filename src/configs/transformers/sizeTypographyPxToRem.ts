import StyleDictionary from 'style-dictionary'
import { isTypographyFontOrLineHeight } from './utils'
import { TRANSFORM_NAME_PX_TO_REM_TYPOGRAPHY } from './transformNames'

const REM_TO_PX = 16

function toRemStringFromPx(pxValue: number): string {
  const rem = pxValue / REM_TO_PX
  const rounded = Math.round(rem * 10000) / 10000
  return `${rounded}rem`
}

export function registerCustomTransforms(sd: StyleDictionary): void {
  sd.registerTransform({
    name: TRANSFORM_NAME_PX_TO_REM_TYPOGRAPHY,
    type: 'value',
    transitive: true,
    filter: (token) => isTypographyFontOrLineHeight(token),
    transform: (token) => toRemStringFromPx(token.value),
  })
}
