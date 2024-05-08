"use client";

import styles from "./Select.module.scss"
import Search from "@/components/Search";
import Chip from "@/components/Chip";
import {FaCaretUp} from "@react-icons/all-files/fa/FaCaretUp";
import clsx from "clsx";
import _ from "lodash";
import NoData from "@/components/NoData";
import Loader from "@/components/Loader";
import {SelectChildrenProps, SelectProps, SelectRequiredFields} from "@/components/Select/base/Select.types";
import {useSelect} from "@/components/Select/base/Select.hook";

function Select<T extends SelectRequiredFields>(props: SelectProps<T>) {
    const {
        search,
        isOpen,
        highlightedIndex,
        containerRef,
        optionsRef,
        selectOption,
        isOptionSelected,
        handleSearch,
        setIsOpen,
        setHighlightedIndex,
        handleScrollBottom
    } = useSelect(props);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="options"
            aria-autocomplete="list"
            aria-activedescendant={`option_${highlightedIndex + 1}`}
            aria-labelledby="search"
            className={styles.container}
            data-cy="select"
        >
            <div className={styles.value}>
                {props.multiple ? props.value.map(v => (
                    <Chip
                        key={v.id}
                        text={_.get(v, props.accessor) as string}
                        onDelete={() => selectOption(v)}
                    />
                )) : _.get(props.value, props.accessor) as string}
                {!!props.onSearch && <Search onSearch={handleSearch}/>}
            </div>
            <div className={clsx(styles.caret, {
                [styles.opened]: isOpen
            })}>
                <FaCaretUp/>
            </div>
            <ul id="options" className={clsx(styles.options, {[styles.show]: isOpen})} ref={optionsRef}
                onScroll={handleScrollBottom} role="listbox" aria-label="Options" data-cy="options">
                {props.loading ? (
                    <Loader />
                ) : (props.options?.length ? props.options.map((option, index) => (
                    <li
                        id={`option_${index + 1}`}
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            if (!props.multiple) {
                                setIsOpen(false);
                            }
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
                        {(props.children && props.children({
                            option,
                            search
                        } as SelectChildrenProps<T>)) || _.get(option, props.accessor) as string}
                    </li>
                )) : <NoData text="No data"/>)}
            </ul>
        </div>
    )
}

export default Select;
