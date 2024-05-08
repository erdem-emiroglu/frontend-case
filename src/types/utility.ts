export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export type NestedPropertyPath<T, Depth extends number = 5> = [Depth] extends [never]
    ? never
    : T extends object
        ? {
            [K in keyof T]: K extends string | number
                ? `${K}` | (Depth extends 0 ? never : `${K}.${NestedPropertyPath<T[K], Prev[Depth]> & string}`)
                : never
        }[keyof T]
        : never;

type Prev = [never, 0, 1, 2, 3, 4, 5];
