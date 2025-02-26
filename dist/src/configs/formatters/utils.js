"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.designTokenFilter = designTokenFilter;
function designTokenFilter(token) {
    var _a;
    return ((_a = token.attributes) === null || _a === void 0 ? void 0 : _a.type) !== 'primitive';
}
//# sourceMappingURL=utils.js.map