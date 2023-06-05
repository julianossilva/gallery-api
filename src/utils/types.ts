export type PublicInterface<T> = { [K in keyof T]: T[K] };
