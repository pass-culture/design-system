"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileTsConfig = exports.getWebTsConfig = void 0;
var style_dictionary_1 = require("style-dictionary");
var utils_1 = require("./utils");
var getWebTsConfig = function (sd, brand, theme) {
    var destination = "index.".concat(theme, ".web.ts");
    var sizeTransform = 'size/pxToRem';
    return getTsConfig(sd, sizeTransform, destination, brand, theme);
};
exports.getWebTsConfig = getWebTsConfig;
var getMobileTsConfig = function (sd, brand, theme) {
    var destination = "index.".concat(theme, ".mobile.ts");
    var sizeTransform = 'size/px';
    return getTsConfig(sd, sizeTransform, destination, brand, theme);
};
exports.getMobileTsConfig = getMobileTsConfig;
function getTsConfig(sd, sizeTransform, destination, brand, theme) {
    sd.registerFormat({
        name: 'typings/es6',
        formatter: function (_a) {
            var dictionary = _a.dictionary, file = _a.file;
            var tokens = JSON.stringify(style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens), null, 2);
            return "".concat(style_dictionary_1.formatHelpers.fileHeader({
                file: file,
            }), "export const theme = ").concat(tokens, " as const;\n");
        },
    });
    return {
        include: ['src/tokens/global/**/*.json'],
        source: ["src/tokens/themes/".concat(theme, ".json"), "src/tokens/brands/".concat(brand, "-").concat(theme, ".json")],
        platforms: {
            ts: {
                transforms: ['attribute/cti', 'name/cti/pascal', sizeTransform, 'color/hex'],
                buildPath: "build/".concat(brand, "/"),
                files: [
                    {
                        destination: destination,
                        format: 'typings/es6',
                        filter: utils_1.designTokenFilter,
                    },
                ],
            },
        },
    };
}
//# sourceMappingURL=getTsConfig.js.map