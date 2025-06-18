import { designTokenFilter } from './utils';
export const getWebCssConfig = (sd, brand, theme) => {
    return {
        include: ['src/tokens/global/**/*.json'],
        source: [`src/tokens/themes/${theme}.json`, `src/tokens/brands/${brand}-${theme}.json`],
        platforms: {
            css: {
                transforms: ['attribute/cti', 'name/kebab', 'size/pxToRem', 'color/css'],
                buildPath: `build/${brand}/`,
                files: [
                    {
                        destination: `variables-${theme}.css`,
                        format: 'css/variables',
                        filter: designTokenFilter,
                        options: {
                            selector: `[data-theme="${theme}"]`,
                            formatting: {
                                fileHeaderTimestamp: true,
                            },
                        },
                    },
                ],
            },
        },
    };
};
//# sourceMappingURL=getWebCssConfig.js.map