import { fileHeader } from 'style-dictionary/utils';
function createFontFace(name, url) {
    return [
        '@font-face {',
        ` font-family: "${name.value}";`,
        ` font-style: "${name.value.includes('Italic') ? 'italic' : 'normal'}";`,
        ` src: url(${url.value}) format('woff2');`,
        ` font-display: "swap";`,
        ` unicode-range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";`,
        '}',
    ]
        .filter(Boolean)
        .join('\n');
}
const sdFontFacesFormatter = async ({ dictionary, file }) => {
    const fonts = Object.entries(dictionary.tokens.fontFamily || {}).map(([key, val]) => createFontFace(val.name, val.url));
    return `${await fileHeader({
        file,
        formatting: {
            fileHeaderTimestamp: true,
        },
    })}\n${fonts.join('\n\n')}`;
};
const sdFontPreloadsFormatter = async ({ dictionary, file }) => {
    const fontsUrls = Object.values(dictionary.tokens.fontFamily || {}).map((font) => font.url.value);
    function createPreload(url) {
        return `<link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin/>`;
    }
    return `${await fileHeader({
        file,
        formatting: {
            fileHeaderTimestamp: true,
        },
    })}\nexport const fontPreloads =\n\`${fontsUrls.map(createPreload).join('\n')}\``;
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