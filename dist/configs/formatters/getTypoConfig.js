"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypoConfig = void 0;
var style_dictionary_1 = require("style-dictionary");
function createFontFace(token) {
    return [
        '@font-face {',
        " font-family: \"".concat(token.family, "\";"),
        token.style ? " font-style: \"".concat(token.style, "\";") : '',
        token.weight ? " font-weight: \"".concat(token.weight, "\";") : '',
        " src: url(".concat(token.src, ") format('woff2');"),
        " font-display: \"swap\";",
        " unicode-range: \"".concat(token['unicode-range'], "\";"),
        '}',
    ]
        .filter(Boolean)
        .join('\n');
}
var sdFontFacesFormatter = function (_a) {
    var _b;
    var dictionary = _a.dictionary, file = _a.file;
    var fontFacesTokens = (_b = style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens)['font']) !== null && _b !== void 0 ? _b : {};
    return "".concat(style_dictionary_1.formatHelpers.fileHeader({
        file: file,
    }), "\n").concat(Object.values(fontFacesTokens).map(createFontFace).join('\n\n'));
};
var sdFontPreloadsFormatter = function (_a) {
    var _b;
    var dictionary = _a.dictionary, file = _a.file;
    var fontTokens = (_b = style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens)['font']) !== null && _b !== void 0 ? _b : {};
    function createPreload(token) {
        return "<link rel=\"preload\" href=\"".concat(token.src, "\" as=\"font\" type=\"font/woff2\" crossorigin/>");
    }
    return "".concat(style_dictionary_1.formatHelpers.fileHeader({
        file: file,
    }), "\nexport const fontPreloads =\n`").concat(Object.values(fontTokens).map(createPreload).join('\n'), "`");
};
var getTypoConfig = function (sd) {
    sd.registerFormat({
        name: 'css/font-faces',
        formatter: sdFontFacesFormatter,
    });
    sd.registerFormat({
        name: 'ts/font-preloads',
        formatter: sdFontPreloadsFormatter,
    });
    return {
        source: ['src/tokens/global/typography/**/*.json'],
        platforms: {
            css: {
                transforms: ['name/cti/kebab'],
                buildPath: 'build/global/',
                files: [
                    {
                        destination: 'font-faces.css',
                        format: 'css/font-faces',
                    },
                ],
            },
            js: {
                transforms: ['name/cti/kebab'],
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
exports.getTypoConfig = getTypoConfig;
//# sourceMappingURL=getTypoConfig.js.map