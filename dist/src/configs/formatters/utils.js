export function designTokenFilter(token) {
    return !token.filePath.endsWith('primitive.json');
}
export function getTokensColors(tokens) {
    const isTokenWithValue = typeof tokens === 'object' && tokens !== null && 'value' in tokens;
    if (!isTokenWithValue) {
        return Object.values(tokens).flatMap(getTokensColors);
    }
    return tokens.path.includes('color') ? tokens.value : [];
}
//# sourceMappingURL=utils.js.map