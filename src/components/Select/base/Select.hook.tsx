import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '@/components/Select/base/Select.module.scss';
import { SelectProps, KeyCodes, SelectRequiredFields } from '@/components/Select/base/Select.types';

export function useSelect<T extends SelectRequiredFields>({
  multiple,
  value,
  onChange,
  options,
  onSearch,
  onScrollBottom,
}: SelectProps<T>) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const selectOption = useCallback(
    (option: T) => {
      if (multiple) {
        if (value.find((o) => o.id === option.id)) {
          onChange(value.filter((o) => o.id !== option.id));
        } else {
          onChange([...value, option]);
        }
      } else {
        if (option.id !== value?.id) onChange(option);
      }
    },
    [multiple, onChange, value],
  );

  const isOptionSelected = useMemo(
    () => (option: T) => {
      return multiple ? value.includes(option) : option === value;
    },
    [multiple, value],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (onSearch) {
        onSearch(value);
      }
      setIsOpen(true);
      setHighlightedIndex(0);
    },
    [onSearch],
  );

  const scrollIntoHighlighted = useCallback(() => {
    const list = optionsRef?.current;
    const highlighted = containerRef.current?.querySelector(`.${styles.highlighted}`) as HTMLElement;
    const selectedOptionsContainer = containerRef.current?.querySelector(`.${styles.value}`) as HTMLElement;

    if (list && highlighted && selectedOptionsContainer) {
      const selectedOptionsHeight = selectedOptionsContainer.getBoundingClientRect().height;
      list.scrollTop = highlighted.offsetTop - list.offsetTop + selectedOptionsHeight;
    }
  }, []);

  const handleScrollBottom = useCallback(
    async (e: React.UIEvent<HTMLUListElement>) => {
      const list = e.currentTarget;
      const isBottom = list.scrollHeight - list.scrollTop === list.clientHeight;
      if (isBottom && onScrollBottom) {
        await onScrollBottom();

        const observer = new MutationObserver(() => {
          // Once the DOM updates are complete, call scrollIntoHighlighted and disconnect the observer
          scrollIntoHighlighted();
          observer.disconnect();
        });

        // Start observing the list for changes in its children
        observer.observe(list, { childList: true });
      }
    },
    [onScrollBottom, scrollIntoHighlighted],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target != containerRef.current && (e.target as HTMLInputElement).id !== 'search') return;

      switch (e.code) {
        case KeyCodes.Enter:
          setIsOpen(true);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case KeyCodes.ArrowUp:
        case KeyCodes.ArrowDown: {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === KeyCodes.ArrowDown ? 1 : -1);
          if (newValue >= 0 && newValue < options?.length) {
            setHighlightedIndex(newValue);
          }

          scrollIntoHighlighted();
          break;
        }
        case KeyCodes.Escape:
          setIsOpen(false);
          break;
      }
    },
    [highlightedIndex, isOpen, options, scrollIntoHighlighted, selectOption],
  );

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    let containerRefValue = null;

    if (containerRef.current) {
      containerRefValue = containerRef.current;
    }

    containerRefValue?.addEventListener('keydown', onKeyDown);

    return () => {
      containerRefValue?.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, options, selectOption, onKeyDown]);

  return {
    search,
    isOpen,
    highlightedIndex,
    containerRef,
    optionsRef,
    selectOption,
    isOptionSelected,
    handleSearch,
    onKeyDown,
    setSearch,
    setIsOpen,
    setHighlightedIndex,
    handleScrollBottom,
  };
}
