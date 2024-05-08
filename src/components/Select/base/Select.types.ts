import {Maybe} from "@/graphql/generated";
import {ReactNode} from "react";

export type SelectRequiredFields = { id?: string | number | Maybe<string>, name?: string | Maybe<string>};

type MultipleSelectProps<T> = {
    multiple: true
    value: T[]
    onChange: (value: T[]) => void
}

type SingleSelectProps<T> = {
    multiple?: false
    value?: T
    onChange: (value: T | undefined) => void
}

export type SelectChildrenProps<T> = {
    option: Required<T>
    search: string
}

export type SelectProps<T> = {
    options: T[];
    loading?: boolean
    children?: ({option, search}: SelectChildrenProps<T>) => ReactNode
    accessor: keyof T;
    onSearch?: (value: string) => void;
    onScrollBottom?: () => void | Promise<void>
} & (SingleSelectProps<T> | MultipleSelectProps<T>)

export enum KeyCodes {
    Enter = "Enter",
    ArrowUp = "ArrowUp",
    ArrowDown = "ArrowDown",
    Escape = "Escape"
}
