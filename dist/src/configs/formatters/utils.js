export function designTokenFilter(token) {
    return !token.filePath.endsWith('primitive.json');
}
export function getColorsCodesInTokens(tokens) {
    if (tokens.attributes?.category === 'color') {
        return tokens.value;
    }
    return Object.entries(tokens).flatMap(([_, token]) => getColorsCodesInTokens(token));
}
//# sourceMappingURL=utils.js.map