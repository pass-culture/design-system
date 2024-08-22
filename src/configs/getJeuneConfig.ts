export function getJeuneConfig(platform: string, theme: string) {
  const sources = []
  const destination = `index${theme ? `.${theme}` : ''}${platform ? `.${platform}` : ''}.ts`
  const sizeTransform = platform === 'web' ? 'size/pxToRem' : 'size/px'

  if (theme) {
    sources.push(`src/tokens/design-tokens-theme-${theme}.json`)
  }

  return {
    include: ['src/tokens/design-tokens.json'],
    source: sources,
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
