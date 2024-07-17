"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_dictionary_1 = require("style-dictionary");
var sd = require('style-dictionary');
var StyleDictionaryJeuneNative = sd.extend('src/configs/config-jeunes.json');
var StyleDictionaryJeuneWeb = sd.extend('src/configs/config-jeunes-web.json');
var StyleDictionaryPro = sd.extend('src/configs/config-pro.json');
var sdJeuneFormatter = function (_a) {
    var dictionary = _a.dictionary, file = _a.file;
    var tokens = JSON.stringify(style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens), null, 2);
    return "".concat(style_dictionary_1.formatHelpers.fileHeader({ file: file }), "export const theme = ").concat(tokens, " as const;\n");
};
var sdFontFacesFormatter = function (_a) {
    var _b;
    var dictionary = _a.dictionary, file = _a.file;
    var fontFacesTokens = (_b = style_dictionary_1.formatHelpers.minifyDictionary(dictionary.tokens)['font']) !== null && _b !== void 0 ? _b : {};
    function createFontFace(token) {
        return [
            '@font-face {',
            " font-family: \"".concat(token.family, "\";"),
            token.style ? " font-style: \"".concat(token.style, "\";") : '',
            token.weight ? " font-weight: \"".concat(token.weight, "\";") : '',
            " src: ".concat(token.src, ";"),
            " font-display: \"swap\";",
            " unicode-range: \"".concat(token['unicode-range'], "\";"),
            '}',
        ]
            .filter(Boolean)
            .join('\n');
    }
    return Object.values(fontFacesTokens).map(createFontFace).join('\n\n');
};
StyleDictionaryJeuneNative.registerFormat({
    name: 'typings/es6',
    formatter: sdJeuneFormatter,
});
StyleDictionaryJeuneWeb.registerFormat({
    name: 'typings/es6',
    formatter: sdJeuneFormatter,
});
StyleDictionaryPro.registerFormat({
    name: 'css/font-faces',
    formatter: sdFontFacesFormatter,
});
StyleDictionaryJeuneNative.buildAllPlatforms();
StyleDictionaryJeuneWeb.buildAllPlatforms();
StyleDictionaryPro.buildAllPlatforms();
//# sourceMappingURL=build.js.map