export declare type LoadOptions = {
    usesPages: boolean;
};
export declare const DefaultLoadConfig: LoadOptions;
export default function load(unresolvedPath: string, opts?: Partial<LoadOptions>): Promise<any>;
