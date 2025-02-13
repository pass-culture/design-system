"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.designTokenFilter = void 0;
function designTokenFilter(token) {
    var _a;
    return ((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.type) !== 'primitive';
}
exports.designTokenFilter = designTokenFilter;
//# sourceMappingURL=utils.js.map