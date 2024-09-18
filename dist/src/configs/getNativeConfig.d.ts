export declare function getNativeConfig(platform: 'web' | 'mobile'): {
    source: string[];
    platforms: {
        ts: {
            transforms: string[];
            buildPath: string;
            files: {
                destination: string;
                format: string;
            }[];
        };
    };
};
