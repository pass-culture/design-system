import StyleDictionary from 'style-dictionary';
import { BrandsConfig, PlatformConfigs } from '../types';
export declare const brandsConfig: BrandsConfig;
export declare const platformFormatter: PlatformConfigs;
export declare function getBrandConfigs(sd: typeof StyleDictionary): import("style-dictionary/types/Config").Config[];
