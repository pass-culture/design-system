import StyleDictionary from 'style-dictionary'

const REM_TO_PX = 16
const TRANSFORM_NAME = 'size/pxToRem_typography'

function isTypographyFontOrLineHeight(token): boolean {
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

function toRemStringFromPx(pxValue: number): string {
  const rem = pxValue / REM_TO_PX
  const rounded = Math.round(rem * 10000) / 10000
  return `${rounded}rem`
}

export function registerCustomTransforms(sd: StyleDictionary): void {
  sd.registerTransform({
    name: TRANSFORM_NAME,
    type: 'value',
    transitive: true,
    filter: (token) => isTypographyFontOrLineHeight(token),
    transform: (token) => toRemStringFromPx(token.value),
  })
}
