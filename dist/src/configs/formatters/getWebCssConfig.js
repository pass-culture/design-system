"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebCssConfig = void 0;
var utils_1 = require("./utils");
var getWebCssConfig = function (sd, brand, theme) {
    return {
        include: ['src/tokens/global/**/*.json'],
        source: ["src/tokens/themes/".concat(theme, ".json"), "src/tokens/brands/".concat(brand, "-").concat(theme, ".json")],
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
                buildPath: "build/".concat(brand, "/"),
                files: [
                    {
                        destination: "variables-".concat(theme, ".css"),
                        format: 'css/variables',
                        filter: utils_1.designTokenFilter,
                        options: {
                            selector: "[data-theme=\"".concat(theme, "\"]"),
                        },
                    },
                ],
            },
        },
    };
};
exports.getWebCssConfig = getWebCssConfig;
//# sourceMappingURL=getWebCssConfig.js.map