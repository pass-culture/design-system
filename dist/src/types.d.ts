import StyleDictionary, { Config } from 'style-dictionary';
export declare enum Brand {
    PRO = "pro",
    JEUNE = "jeune"
}
export declare enum Platform {
    WEB_CSS = "web.css",
    WEB_TS = "web.ts",
    MOBILE_TS = "mobile.ts"
}
export declare enum Theme {
    LIGHT = "light",
    DARK = "dark"
}
export type BrandsConfig = {
    [key in Brand]: {
        platforms: Platform[];
        themes: Theme[];
    };
};
export type ConfigFormatter = (sd: StyleDictionary, brand?: string, theme?: string) => Config;
export type PlatformConfigs = {
    [key: string]: ConfigFormatter;
};
