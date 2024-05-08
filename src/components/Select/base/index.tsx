"use client";

import {ReactNode, useCallback, useEffect, useRef, useState} from "react"
import {NestedPropertyPath} from "@/types/utility";
import styles from "./select.module.scss"
import Search from "@/components/Search";
import Chip from "@/components/Chip";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import clsx from "clsx";
import _ from "lodash";
import {Maybe} from "@/graphql/generated";

type SelectRequiredFields = { id?: string | number | Maybe<string> };

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

type SelectChildrenProps<T> = {
    option: Required<T>
    search: string
}

type SelectProps<T> = {
    options: T[]
    loading?: boolean
    children?: ({option, search}: SelectChildrenProps<T>) => ReactNode
    accessor: NestedPropertyPath<T>;
    onSearch?: (value: string) => void;
} & (SingleSelectProps<T> | MultipleSelectProps<T>)

export function Select<T extends SelectRequiredFields>({
                                                           multiple,
                                                           value,
                                                           onChange,
                                                           options,
                                                           accessor,
                                                           onSearch,
                                                           loading,
                                                           children
                                                       }: SelectProps<T>) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectOption = useCallback((option: T) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
    }, [multiple, onChange, value])

    const isOptionSelected = (option: T) => {
        return multiple ? value.includes(option) : option === value
    }

    const handleSearch = (value: string) => {
        setSearch(value);

        _.debounce(() => {
            if (onSearch) {
                onSearch(search);
                setIsOpen(true);
                setHighlightedIndex(0);
            }
        }, 500)();
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.target != containerRef.current) return
        switch (e.code) {
            case "Enter":
            case "Space":
                setIsOpen(prev => !prev)
                if (isOpen) selectOption(options[highlightedIndex])
                break
            case "ArrowUp":
            case "ArrowDown": {
                if (!isOpen) {
                    setIsOpen(true)
                    break
                }

                const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                if (newValue >= 0 && newValue < options.length) {
                    setHighlightedIndex(newValue)
                }

                const list = containerRef.current?.querySelector("ul");
                const highlighted = containerRef.current?.querySelector(`.${styles.highlighted}`) as HTMLElement;
                if (list && highlighted) {
                    list.scrollTop = highlighted.offsetTop - list.offsetTop
                }
                break
            }
            case "Escape":
                setIsOpen(false)
                break
        }
    }, [highlightedIndex, isOpen, options, selectOption])

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        let containerRefValue = null;

        if (containerRef.current) {
            containerRefValue = containerRef.current;
        }

        containerRefValue?.addEventListener("keydown", onKeyDown)

        return () => {
            containerRefValue?.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen, options, selectOption, onKeyDown])

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
        >
            <div className={styles.value}>
                {multiple ? value.map(v => (
                    <Chip
                        key={v.id}
                        label={_.get(v, accessor)}
                        onDelete={() => selectOption(v)}
                    />
                )) : _.get(value, accessor)}
                {onSearch && <Search value={search} onChange={handleSearch}/>}
            </div>
            {isOpen ? <FaCaretUp color="#475569" size={24}/> : <FaCaretDown color="#475569" size={24}/>}
            <ul className={clsx(styles.options, {[styles.show]: isOpen})}>
                {loading && <li>Loading...</li>}
                {!loading && options?.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.id}
                        className={clsx(
                            styles.option,
                            {
                                [styles.selected]: isOptionSelected(option),
                                [styles.highlighted]: index === highlightedIndex
                            }
                        )}
                    >
                        {(children && children({option, search} as SelectChildrenProps<T>)) || _.get(option, accessor)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
