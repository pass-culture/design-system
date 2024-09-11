export function getNativeConfig(platform: 'web' | 'mobile') {
  const destination = `index${platform === 'mobile' ? '' : `.${platform}`}.ts`
  const sizeTransform = platform === 'web' ? 'size/pxToRem' : 'size/px'

  return {
    source: ['src/tokens/design-tokens.json'],
    platforms: {
      ts: {
        transforms: ['attribute/cti', 'name/cti/pascal', sizeTransform, 'color/hex'],
        buildPath: 'build/ts/',
        files: [
          {
            destination: destination,
            format: 'typings/es6',
          },
        ],
      },
    },
  }
}
