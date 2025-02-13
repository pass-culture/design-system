"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandConfigs = exports.platformFormatter = exports.brandsConfig = void 0;
var types_1 = require("../types");
var getWebCssConfig_1 = require("./formatters/getWebCssConfig");
var getTsConfig_1 = require("./formatters/getTsConfig");
exports.brandsConfig = {
    pro: {
        platforms: [types_1.Platform.WEB_CSS, types_1.Platform.WEB_TS],
        themes: [types_1.Theme.LIGHT, types_1.Theme.DARK],
    },
    jeune: {
        platforms: [types_1.Platform.WEB_TS, types_1.Platform.MOBILE_TS],
        themes: [types_1.Theme.LIGHT, types_1.Theme.DARK],
    },
};
exports.platformFormatter = (_a = {},
    _a['web.css'] = getWebCssConfig_1.getWebCssConfig,
    _a['web.ts'] = getTsConfig_1.getWebTsConfig,
    _a['mobile.ts'] = getTsConfig_1.getMobileTsConfig,
    _a);
function getBrandConfigs(sd) {
    return Object.entries(exports.brandsConfig).flatMap(function (_a) {
        var brand = _a[0], brandConfig = _a[1];
        return brandConfig.platforms.flatMap(function (platform) {
            var configFn = exports.platformFormatter[platform];
            if (!configFn) {
                throw Error("No formatter defined for platform ".concat(platform));
            }
            return brandConfig.themes.map(function (theme) {
                return configFn(sd, brand, theme);
            });
        });
    });
}
exports.getBrandConfigs = getBrandConfigs;
//# sourceMappingURL=brands.js.map