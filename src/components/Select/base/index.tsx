'use client';

import { FaCaretUp } from '@react-icons/all-files/fa/FaCaretUp';
import clsx from 'clsx';
import _ from 'lodash';

import Chip from '@/components/Chip';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import Search from '@/components/Search';
import { useSelect } from '@/components/Select/base/Select.hook';
import { SelectChildrenProps, SelectProps, SelectRequiredFields } from '@/components/Select/base/Select.types';

import styles from './Select.module.scss';

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
    handleScrollBottom,
  } = useSelect(props);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-controls="options"
      aria-autocomplete="list"
      aria-activedescendant={`option_${highlightedIndex + 1}`}
      aria-labelledby="search"
      data-cy="select"
      className={clsx(styles.container, {
        [styles.error]: props.error,
      })}
    >
      <div className={styles.value}>
        {props.error && <span className={styles.error}>{props.error}</span>}
        {props.multiple
          ? props.value.map((v) => (
              <Chip key={v.id} text={_.get(v, props.accessor) as string} onDelete={() => selectOption(v)} />
            ))
          : (_.get(props.value, props.accessor) as string)}
        {!!props.onSearch && !props.error && <Search onSearch={handleSearch} />}
      </div>
      <div
        className={clsx(styles.caret, {
          [styles.opened]: isOpen,
          [styles.error]: props.error,
        })}
      >
        <FaCaretUp />
      </div>
      {!props.error && (
        <ul
          id="options"
          className={clsx(styles.options, { [styles.show]: isOpen })}
          ref={optionsRef}
          onScroll={handleScrollBottom}
          role="listbox"
          aria-label="Options"
          data-cy="options"
        >
          {props.loading ? (
            <Loader />
          ) : props.options?.length ? (
            props.options.map((option, index) => (
              <li
                id={`option_${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                  if (!props.multiple) {
                    setIsOpen(false);
                  }
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.id}
                className={clsx(styles.option, {
                  [styles.selected]: isOptionSelected(option),
                  [styles.highlighted]: index === highlightedIndex,
                })}
              >
                {(props.children &&
                  props.children({
                    option,
                    search,
                  } as SelectChildrenProps<T>)) ||
                  (_.get(option, props.accessor) as string)}
              </li>
            ))
          ) : (
            <NoData className={styles.noOptions} text="No options" />
          )}
        </ul>
      )}
    </div>
  );
}

export default Select;
