import { DesignTokens } from 'style-dictionary'
import { ConfigFormatter } from '../../types'
import { getJSONFromUrl, getTxtFromUrl, isSemanticToken } from './utils'

export const getWebCssConfig: ConfigFormatter = async (sd, brand, theme) => {
  const tokensUrlsStr = await getTxtFromUrl(process.env.ZEROHEIGHT_TOKENS_URL || '')

  const tokensUrls = tokensUrlsStr.split('\n').filter(
    (str) =>
      //  Filter the semantic and primitive token JSON files
      //  Ideally the theme can also be used in the url
      (str.includes('mode_name=value') || str.includes(`mode_name=${brand}`)) &&
      (str.includes('collection_name=primitive') || str.includes('collection_name=semantic'))
  )

  const tokensJsons = (await Promise.all(tokensUrls.map(getJSONFromUrl))) as DesignTokens[]

  const tokens: DesignTokens = {}

  for (const tokenJson of tokensJsons) {
    tokens.color = { ...(tokens.color || {}), ...tokenJson.color }!
  }

  return {
    tokens: tokens,
    platforms: {
      css: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'content/icon',
          'size/pxToRem',
          'color/css',
        ],
        buildPath: `build/${brand}/`,
        files: [
          {
            destination: `variables-${theme}.css`,
            format: 'css/variables',
            filter: isSemanticToken,
            options: {
              selector: `[data-theme="${theme}"]`,
            },
          },
        ],
      },
    },
  }
}
