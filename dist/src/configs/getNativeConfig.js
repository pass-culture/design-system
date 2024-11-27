"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeConfig = void 0;
function getNativeConfig(platform) {
    var destination = "index".concat(platform === 'mobile' ? '' : ".".concat(platform), ".ts");
    var sizeTransform = platform === 'web' ? 'size/pxToRem' : 'size/px';
    return {
        source: ['src/tokens/design-tokens.json'],
        platforms: {
            ts: {
                transforms: ['attribute/cti', 'name/cti/pascal', sizeTransform, 'color/hex'],
                buildPath: 'build/ts/',
                files: [
                    {
                        destination: destination,
                        format: 'typings/es6',
                    },
                ],
            },
        },
    };
}
exports.getNativeConfig = getNativeConfig;
//# sourceMappingURL=getNativeConfig.js.map