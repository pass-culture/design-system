import { ConfigFormatter } from '../../types'

export const getAssetConfig: ConfigFormatter = (sd) => {
  return {
    source: ['src/tokens/assets/icons.json'],
    platforms: {
      'assets/embed/json': {
        transforms: ['attribute/cti', 'name/kebab', 'asset/base64'],
        buildPath: 'build/global/',
        files: [
          {
            destination: 'icons.json',
            format: 'json/flat',
            filter: {
              attributes: {
                category: 'asset',
                type: 'icon',
              },
            },
          },
        ],
      },
    },
  }
}
