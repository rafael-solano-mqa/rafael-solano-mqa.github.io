export type NamedTuple<K extends keyof any, T>  = {
    [P in K]: T;
};


