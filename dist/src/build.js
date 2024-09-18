"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_dictionary_1 = require("style-dictionary");
var getNativeConfig_1 = require("./configs/getNativeConfig");
var sd = require('style-dictionary');
var StyleDictionaryPro = sd.extend('src/configs/config-pro.json');
var StyleDictionaryFonts = sd.extend('src/configs/config-fonts.json');
var sdFontFacesFormatter = function (_a) {
    var _b;
    var dictionary = _a.dictionary;
    var fontFacesTokens = (_b = style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens)['font']) !== null && _b !== void 0 ? _b : {};
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
    return Object.values(fontFacesTokens).map(createFontFace).join('\n\n');
};
var sdFontPreloadsFormatter = function (_a) {
    var _b;
    var dictionary = _a.dictionary;
    var fontTokens = (_b = style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens)['font']) !== null && _b !== void 0 ? _b : {};
    function createPreload(token) {
        return "<link rel=\"preload\" href=\"".concat(token.src, "\" as=\"font\" type=\"font/woff2\" crossorigin/>");
    }
    return "export const fontPreloads =\n`".concat(Object.values(fontTokens)
        .map(createPreload)
        .join('\n'), "`");
};
StyleDictionaryFonts.registerFormat({
    name: 'css/font-faces',
    formatter: sdFontFacesFormatter,
});
StyleDictionaryFonts.registerFormat({
    name: 'ts/font-preloads',
    formatter: sdFontPreloadsFormatter,
});
//  Generate native variables for all platforms
var sdNativeFormatter = function (_a) {
    var dictionary = _a.dictionary, file = _a.file;
    var tokens = JSON.stringify(style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens), null, 2);
    return "".concat(style_dictionary_1.formatHelpers.fileHeader({ file: file }), "export const theme = ").concat(tokens, " as const;\n");
};
['web', 'mobile'].map(function (platform) {
    var StyleDictionaryNative = sd.extend((0, getNativeConfig_1.getNativeConfig)(platform));
    StyleDictionaryNative.registerFormat({
        name: 'typings/es6',
        formatter: sdNativeFormatter,
    });
    StyleDictionaryNative.buildAllPlatforms();
});
StyleDictionaryPro.buildAllPlatforms();
StyleDictionaryFonts.buildAllPlatforms();
//# sourceMappingURL=build.js.map