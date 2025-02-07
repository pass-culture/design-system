"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var brands_1 = require("./configs/brands");
var getTypoConfig_1 = require("./configs/formatters/getTypoConfig");
var style_dictionary_1 = __importDefault(require("style-dictionary"));
//  Build the cross-brand configs
var StyleDictionaryGlobal = style_dictionary_1.default.extend((0, getTypoConfig_1.getTypoConfig)(style_dictionary_1.default));
StyleDictionaryGlobal.buildAllPlatforms();
//  Build the brand-specific configs
var brandConfigs = (0, brands_1.getBrandConfigs)(style_dictionary_1.default);
for (var _i = 0, brandConfigs_1 = brandConfigs; _i < brandConfigs_1.length; _i++) {
    var config = brandConfigs_1[_i];
    var StyleDictionaryBrand = style_dictionary_1.default.extend(config);
    StyleDictionaryBrand.buildAllPlatforms();
}
//# sourceMappingURL=build.js.map