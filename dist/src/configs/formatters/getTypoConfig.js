import { fileHeader, minifyDictionary } from 'style-dictionary/utils';
function createFontFace(token) {
    return [
        '@font-face {',
        ` font-family: "${token.family}";`,
        token.style ? ` font-style: "${token.style}";` : '',
        token.weight ? ` font-weight: "${token.weight}";` : '',
        ` src: url(${token.src}) format('woff2');`,
        ` font-display: "swap";`,
        ` unicode-range: "${token['unicode-range']}";`,
        '}',
    ]
        .filter(Boolean)
        .join('\n');
}
const sdFontFacesFormatter = async ({ dictionary, file }) => {
    const fontFacesTokens = minifyDictionary(dictionary.tokens)['font'] ?? {};
    return `${await fileHeader({
        file,
        formatting: {
            fileHeaderTimestamp: true,
        },
    })}\n${Object.values(fontFacesTokens).map(createFontFace).join('\n\n')}`;
};
const sdFontPreloadsFormatter = async ({ dictionary, file }) => {
    const fontTokens = minifyDictionary(dictionary.tokens)['font'] ?? {};
    function createPreload(token) {
        return `<link rel="preload" href="${token.src}" as="font" type="font/woff2" crossorigin/>`;
    }
    return `${await fileHeader({
        file,
        formatting: {
            fileHeaderTimestamp: true,
        },
    })}\nexport const fontPreloads =\n\`${Object.values(fontTokens).map(createPreload).join('\n')}\``;
};
export const getTypoConfig = (sd) => {
    sd.registerFormat({
        name: 'css/font-faces',
        format: sdFontFacesFormatter,
    });
    sd.registerFormat({
        name: 'ts/font-preloads',
        format: sdFontPreloadsFormatter,
    });
    return {
        source: ['src/tokens/global/typography/**/*.json'],
        platforms: {
            css: {
                transforms: ['name/kebab'],
                buildPath: 'build/global/',
                files: [
                    {
                        destination: 'font-faces.css',
                        format: 'css/font-faces',
                    },
                ],
            },
            js: {
                transforms: ['name/kebab'],
                buildPath: 'build/global/',
                files: [
                    {
                        destination: 'font-preloads.ts',
                        format: 'ts/font-preloads',
                    },
                ],
            },
        },
    };
};
//# sourceMappingURL=getTypoConfig.js.map