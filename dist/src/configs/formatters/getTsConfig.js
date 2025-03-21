import { minifyDictionary, fileHeader } from 'style-dictionary/utils';
import { designTokenFilter, getColorsCodesInTokens } from './utils';
export const getWebTsConfig = (sd, brand, theme) => {
    const destination = `index.${theme}.web.ts`;
    const sizeTransform = 'size/pxToRem';
    return getTsConfig(sd, sizeTransform, destination, brand, theme);
};
export const getMobileTsConfig = (sd, brand, theme) => {
    const destination = `index.${theme}.mobile.ts`;
    const sizeTransform = 'size/px';
    return getTsConfig(sd, sizeTransform, destination, brand, theme);
};
function getTsConfig(sd, sizeTransform, destination, brand, theme) {
    sd.registerFormat({
        name: 'typings/es6',
        format: async ({ dictionary, file }) => {
            const tokens = JSON.stringify(minifyDictionary(dictionary.tokens), null, 2);
            const avoidDuplicateColors = Array.from(new Set(getColorsCodesInTokens(dictionary.tokens.color ?? {})));
            const colorsType = avoidDuplicateColors.map((color) => `"${color}"`).join(' | ');
            return `${await fileHeader({
                file,
                formatting: {
                    fileHeaderTimestamp: true,
                },
            })}export const theme = ${tokens} as const;\n\nexport type ColorsType = ${colorsType};
      `;
        },
    });
    return {
        include: ['src/tokens/global/**/*.json'],
        source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
        platforms: {
            ts: {
                transforms: ['attribute/cti', 'name/pascal', sizeTransform, 'color/hex'],
                buildPath: `build/${brand}/`,
                files: [
                    {
                        destination: destination,
                        format: 'typings/es6',
                        filter: designTokenFilter,
                    },
                ],
            },
        },
    };
}
//# sourceMappingURL=getTsConfig.js.map