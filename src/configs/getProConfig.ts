export function getProConfig(theme: string) {
  const sources = ['src/tokens/design-tokens-platform-pro.json']
  const destination = `variables${theme ? `-${theme}` : ''}.css`

  if (theme) {
    sources.push(`src/tokens/design-tokens-platform-pro-theme-${theme}.json`)
  }

  return {
    include: ['src/tokens/design-tokens.json'],
    source: sources,
    platforms: {
      css: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'time/seconds',
          'content/icon',
          'size/pxToRem',
          'color/css',
        ],
        buildPath: 'build/css/',
        files: [
          {
            destination: destination,
            format: 'css/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  }
}
