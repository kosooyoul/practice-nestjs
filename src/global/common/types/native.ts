export type StringMap = { [key: string]: string };
export type NullableStringMap = { [key: string]: string | null | undefined };
export type StringArrayMap = { [key: string]: string[] };
export type AnyArrayMap = { [key: string]: any[] };
export type NumberMap = { [key: string]: number };
export type BooleanMap = { [key: string]: boolean };
export type AnyMap = { [key: string]: any };
export type Map<T> = { [key: string]: T };

export type Optional<T> = T | null | undefined;
export type Nullable<T> = T | null;
